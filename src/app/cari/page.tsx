"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getImageUrl } from "@/utils/ui";
import axios from "axios";
import { GenerativeResponse } from "@/type/recipe";
import { CookpadListRecipe } from "@/utils/cookpad";
import { insertInDB } from "@/utils/indexDb";
import Layout from "@/components/wrapper/layout/Layout";
import {
  BookmarkIcon,
  CameraIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import RecipeReader from "@/components/wrapper/Recipe/RecipeReader";
import Image from "next/image";
import Button from "@/components/base/button/Button";
import ProgressBar from "@/components/base/loader/Progress";

type currentImage = {
  file: File;
  url: string;
};

export default function Index() {
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
  const [showFormImage, setShowFormImage] = useState<boolean>(true);
  const [showButtonSearch, setShowButtonSearch] = useState<boolean>(true);

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

  function setterCurrentImage(files: FileList) {
    const imageFile = files[0];
    const urlImage = getImageUrl(imageFile);
    setCurrentImage({
      file: imageFile,
      url: urlImage,
    });
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
  }

  function handleToggleShowFormImage() {
    if (!currentImage) return;
    setShowFormImage(!showFormImage);
  }

  async function handleSearchMasak() {
    if (currentImage) {
      setShowButtonSearch(false);
      setLoading(true);
      setLoadingState({ percent: 0, state: "Starting" });
      const data = new FormData();
      data.set("image", currentImage.file);
      const res = await axios.post("/api/generative", data);
      setDataRecipe(res.data.generativeResponse);
      setListCookpadRecipe(res.data.listCookpadRecipe);
    }
  }

  async function handleSaveRecipe() {
    await insertInDB(
      { ...dataRecipe, source: "generative", img: currentImage?.file },
      `generative-${dataRecipe?.nama_makanan.replace(" ", "-")}`
    );
  }

  return (
    <Layout>
      <div className="h-full p-10 pb-20 relative">
        <h1 className="text-xl font-semibold text-primary-softblack ">
          Cari Resep
        </h1>

        {/* IMAGE */}
        <div
          className="w-full min-h-[350px] border-4 border-primary-orange mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden relative"
          onClick={handleToggleShowFormImage}
        >
          {showFormImage && (
            <div
              className={
                "flex absolute top-0 left-0 right-0 bottom-0 w-full h-full items-center justify-center z-20 bg-white bg-opacity-50 rounded-lg"
              }
            >
              <div className="flex flex-col gap-5">
                <button
                  className="text-sm font-semibold flex gap-2 items-center"
                  onClick={handleOpenUploadPicture}
                >
                  <FolderIcon className="w-5 h-5" />
                  <span>Unggah foto</span>
                </button>
                <button className="text-sm font-semibold flex gap-2 items-center">
                  <CameraIcon className="w-5 h-5" />
                  <span>Ambil foto</span>
                </button>
              </div>
            </div>
          )}

          {currentImage?.url && (
            <div className="w-full min-h-[350px] flex justify-center items-center relative overflow-hidden">
              <Image
                fill
                src={currentImage.url}
                alt={currentImage.file.name}
                className="w-full h-full"
                objectFit="cover"
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
          />
        )}
      </div>
    </Layout>
  );
}
