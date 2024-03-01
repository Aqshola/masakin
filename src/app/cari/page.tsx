"use client";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { getImageUrl } from "@/utils/ui";
import axios from "axios";
import { GenerativeResponse } from "@/type/recipe";
import { CookpadListRecipe } from "@/utils/cookpad";
import { CameraIcon, FolderIcon } from "@heroicons/react/24/outline";
import RecipeReader from "@/components/wrapper/Recipe/RecipeReader";
import Image from "next/image";
import Button from "@/components/base/button/Button";
import ProgressBar from "@/components/base/loader/Progress";
import {
  base64ToFile,
  compressImage,
  imageToBase64,
  saveRecipe,
} from "@/utils/helper";
import { getStorageState, setStorageState } from "@/utils/presistent";
import { CameraContext } from "@/contexts/camera/CameraContext";

type currentImage = {
  file: string;
  url: string;
};

export default function Index() {
  //CONTEXT
  const cameraContext = useContext(CameraContext);
  // REF
  const refInputPictureHidden = useRef<HTMLInputElement | null>(null);
  const refInputCamera = useRef<HTMLInputElement | null>(null);

  // DATA STATE
  const [dataRecipe, setDataRecipe] = useState<GenerativeResponse>();
  const [listCookpadRecipe, setListCookpadRecipe] = useState<
    CookpadListRecipe[]
  >([]);
  const [currentImage, setCurrentImage] = useState<currentImage>();

  // UI STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState({
    percent: 0,
    state: "",
  });
  const [loadImage, setLoadImage] = useState<boolean>(false);

  const [showFormImage, setShowFormImage] = useState<boolean>(false);
  const [showButtonSearch, setShowButtonSearch] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let eventSource: EventSource;
    if (loading) {
      eventSource = new EventSource("/api/loading");
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const loadingData = JSON.parse(data.loading);
        setLoadingState(loadingData);

        if (loadingData.percent == "100") {
          setLoadingState(loadingData);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      };
    }

    // @ts-ignore
    if (!loading && eventSource) {
      eventSource.close();
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [loading]);

  //PRESISTENT STATE
  useEffect(() => {
    let timeout = setTimeout(() => {
      if (dataRecipe) {
        const savedPresistent = {
          currentImage,
          dataRecipe,
          showButtonSearch,
          listCookpadRecipe,
        };
        setStorageState(savedPresistent);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentImage, dataRecipe, listCookpadRecipe]);

  //SET PRESISTENT
  useEffect(() => {
    const data = getStorageState();
    if (data) {
      setCurrentImage(data.currentImage);
      setDataRecipe(data.dataRecipe);
      setShowButtonSearch(data.showButtonSearch);
      setListCookpadRecipe(data.listCookpadRecipe);
    }
  }, []);

  useEffect(() => {
    if (cameraContext?.data) {
      setCurrentImage(cameraContext.data);
      console.log(cameraContext.data);
    }
  }, [cameraContext, cameraContext?.data]);

  useEffect(() => {
    if (cameraContext) {
      setLoadImage(cameraContext.load);
    }
  }, [cameraContext, cameraContext?.load]);

  async function setterCurrentImage(files: FileList) {
    setLoadImage(true);
    const imageFile = files[0];
    const compress = await compressImage(imageFile);
    const base64File = (await imageToBase64(compress)) as string;

    const urlImage = getImageUrl(imageFile);
    setCurrentImage({
      file: base64File,
      url: urlImage,
    });
    setLoadImage(false);
  }
  function handleOpenCamera() {
    if (!refInputCamera) return;
    refInputCamera.current?.click();
  }

  function handleOpenUploadPicture() {
    if (!refInputPictureHidden.current) return;
    refInputPictureHidden.current.click();
  }

  function handleUploadPicture(e: ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.currentTarget.files;
    if (!uploadedFile) return;

    setterCurrentImage(uploadedFile);
    setShowFormImage(false);
    setShowButtonSearch(true);
    setDataRecipe(undefined);
    setListCookpadRecipe([]);
  }

  function handleToggleShowFormImage() {
    if (!currentImage) return;
    setShowFormImage(!showFormImage);
  }

  async function handleSearchMasak() {
    if (!currentImage) return;
    const fileImage = base64ToFile(currentImage?.file);
    if (!fileImage) return;
    setIsError(false);
    setShowButtonSearch(false);
    setLoading(true);
    setLoadingState({ percent: 0, state: "Starting" });

    try {
      const data = new FormData();
      data.set("image", fileImage);
      const res = await axios.post("/api/generative", data);
      setDataRecipe(res.data.generativeResponse);
      setListCookpadRecipe(res.data.listCookpadRecipe);
    } catch (error) {
      console.log("[ERROR]", error);
      setShowButtonSearch(true);
      setLoading(false);
      setIsError(true);
    }
  }

  return (
    <div className="h-full p-10 pb-20 relative">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Cari Resep
      </h1>

      {/* IMAGE */}
      <div
        className="w-full min-h-[350px] border-4 border-primary-orange mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden relative"
        onClick={handleToggleShowFormImage}
      >
        {loadImage && (
          <div className="w-full flex justify-center items-center h-full">
            <p className="font-medium">Loading Image ....</p>
          </div>
        )}
        {!loadImage && (showFormImage || !currentImage) && (
          <div
            className={
              "flex absolute top-0 left-0 right-0 bottom-0 w-full h-full items-center justify-center z-20 bg-white bg-opacity-50 rounded-lg"
            }
          >
            <div className="flex flex-col">
              <button
                className="text-sm font-semibold flex gap-2 items-center mb-5"
                onClick={handleOpenUploadPicture}
              >
                <FolderIcon className="w-5 h-5" />
                <span>Unggah foto</span>
              </button>
              <button
                className="text-sm font-semibold flex gap-2 items-center"
                onClick={handleOpenCamera}
              >
                <CameraIcon className="w-5 h-5" />
                <span>Ambil foto</span>
              </button>
            </div>
          </div>
        )}

        {!loadImage && currentImage?.file && (
          <div className="w-full min-h-[350px] flex justify-center items-center relative overflow-hidden">
            <Image
              fill
              src={currentImage.file}
              alt={"food photo"}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <input
          onChange={handleUploadPicture}
          ref={refInputCamera}
          type="file"
          name="image"
          accept="image/*"
          capture="environment"
          className="hidden"
        />
        <input
          onChange={handleUploadPicture}
          type="file"
          className="hidden"
          ref={refInputPictureHidden}
        />
      </div>

      {showButtonSearch && (
        <Button
          className="mt-5 w-full py-2 px-5 font-semibold text-base rounded-lg"
          onClick={handleSearchMasak}
        >
          Cari
        </Button>
      )}

      {isError && (
        <div className="text-xl text-primary-red font-bold text-center mt-10">
          Yah gagal deteksi makanan nih 😔, Yuk Coba run lagi
        </div>
      )}

      {loading && (
        <div className="mt-4">
          <ProgressBar
            value={loadingState.percent}
            indicatorText={loadingState.state}
            max={100}
          />
        </div>
      )}

      {!loading && dataRecipe && currentImage && (
        <RecipeReader
          dataRecipe={dataRecipe}
          image={currentImage.file}
          listCookpadRecipe={listCookpadRecipe}
          type="generative"
        />
      )}
    </div>
  );
}
