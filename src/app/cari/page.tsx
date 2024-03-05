"use client";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GenerativeResponse, RecipeCookpadMini } from "@/type/recipe";
import { CameraIcon, FolderIcon } from "@heroicons/react/24/outline";
import RecipeReader from "@/components/wrapper/recipe/RecipeReader";
import Image from "next/image";
import Button from "@/components/base/button/Button";
import ProgressBar from "@/components/base/loader/Progress";
import { CameraContext } from "@/contexts/camera/CameraContext";
import { Loading } from "@/type/loading";
import { ImageState } from "@/type/image";
import { base64ToImage, getPresistentState, getUploadImageData, setPresistentState } from "@/utils/client/flow";
import { ToastContext } from "@/contexts/toast/ToastContext";


type PresistentState={
  currentImage: ImageState | undefined;
  dataRecipe: GenerativeResponse;
  showButtonSearch: boolean;
  listCookpadRecipe: RecipeCookpadMini[]
}

export default function Index() {
  //CONTEXT
  const cameraContext = useContext(CameraContext);
  // REF
  const refInputPictureHidden = useRef<HTMLInputElement | null>(null);
  const refInputCamera = useRef<HTMLInputElement | null>(null);

  // DATA STATE
  const [dataRecipe, setDataRecipe] = useState<GenerativeResponse>();
  const [listCookpadRecipe, setListCookpadRecipe] = useState<
    Array<RecipeCookpadMini>
  >([]);
  const [currentImage, setCurrentImage] = useState<ImageState>();

  // UI STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<Loading>({
    percent: 0,
    state: "",
  });
  const [loadImage, setLoadImage] = useState<boolean>(false);

  const [showFormImage, setShowFormImage] = useState<boolean>(false);
  const [showButtonSearch, setShowButtonSearch] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);


  //HANDLE LOADING STATE
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

  //STORE PRESISTENT STATE
  useEffect(() => {
    let timeout = setTimeout(() => {
      if (dataRecipe) {
        const savedPresistent:PresistentState = {
          currentImage,
          dataRecipe,
          showButtonSearch,
          listCookpadRecipe,
        };
        setPresistentState(savedPresistent);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentImage, dataRecipe, listCookpadRecipe]);

  //GET PRESISTENT STATE
  useEffect(() => {
    const data = getPresistentState<PresistentState>();
    if (data) {
      setCurrentImage(data.currentImage);
      setDataRecipe(data.dataRecipe);
      setShowButtonSearch(data.showButtonSearch);
      setListCookpadRecipe(data.listCookpadRecipe);
    }
  }, []);

  //GET CAMERA FROM BOTTOM NAV CAMERA BUTTON
  useEffect(() => {
    if (cameraContext?.data) {
      setCurrentImage(cameraContext.data);
      setDataRecipe(undefined)
      setListCookpadRecipe([])
      setShowButtonSearch(true)
    }
  }, [cameraContext, cameraContext?.data]);

  //GET LOAIDNG STATE FROM BOTTOM NAV CAMERA PROCESS
  useEffect(() => {
    if (cameraContext) {
      setLoadImage(cameraContext.load);
    }
  }, [cameraContext, cameraContext?.load]);

  

  function handleOpenCamera() {
    if (!refInputCamera) return;
    refInputCamera.current?.click();
  }

  function handleOpenUploadPicture() {
    if (!refInputPictureHidden.current) return;
    refInputPictureHidden.current.click();
  }

  function handleToggleShowFormImage() {
    if (!currentImage) return;
    setShowFormImage(!showFormImage);
  }

  async function handleUploadPicture(e: ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.currentTarget.files;
    if (!uploadedFile) return;

    setLoadImage(true)
    
    const currentImageFile=uploadedFile[0]
    const uploadData=await getUploadImageData(currentImageFile)
    
    setCurrentImage({
      file: uploadData.base64File,
      url: uploadData.urlImage,
    });
    
    setLoadImage(false);
    setShowFormImage(false);
    setShowButtonSearch(true);
    setDataRecipe(undefined);
    setListCookpadRecipe([]);
  }

  async function handleSearchMasak() {
    if (!currentImage) return;
    const fileImage = base64ToImage(currentImage?.file);
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
