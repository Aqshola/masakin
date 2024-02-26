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
  const refInputPictureHidden = useRef<HTMLInputElement | null>(null);
  const refInputCamera = useRef<HTMLInputElement | null>(null);
  const [currentImage, setCurrentImage] = useState<currentImage>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState({
    percent: 0,
    state: "",
  });
  const [dataRecipe, setDataRecipe] = useState<GenerativeResponse>();
  const [listCookpadRecipe, setListCookpadRecipe] = useState<
    CookpadListRecipe[]
  >([]);

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
  }

  async function handleSearchMasak() {
    if (currentImage) {
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
        <div className="w-full min-h-[350px] border-4 border-primary-orange mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden">
          {!currentImage && (
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
          )}

          {currentImage?.url && (
            <div className="w-full min-h-[350px] flex border justify-center items-center relative">
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


        <Button className="mt-5 w-full py-2 px-5 font-semibold text-base rounded-lg">Cari</Button>
        <ProgressBar/>

        {/* <RecipeReader /> */}

        {/* {dataRecipe && !loading && (
          <FloatingButton onClick={handleSaveRecipe} />
        )}
            {currentImage?.url && (
              <div className="w-72 h-72 flex border justify-center items-center relative">
                <p>Tes</p>
                <Image
                  fill
                  src={currentImage.url}
                  alt={currentImage.file.name}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          <button onClick={handleSearchMasak}>Cari</button>
        </div>

        {loading && (
          <>
            <progress
              className="w-full"
              value={loadingState.percent}
              max={"100"}
            />
            <p className="text-center mt-5 text-lg">{loadingState.state}...</p>
          </>
        )}
        {dataRecipe && !loading && (
          <>
            <div className="mt-10 pt-2 flex flex-col items-center gap-5">
              <h1>{dataRecipe.nama_makanan}</h1>
              <p>{dataRecipe.deskripsi}</p>
            </div>
            <div className="flex flex-col gap-5">
              <h3>Resep</h3>
              <div>
                <h5>Bahan-Bahan</h5>
                <ul className="list-disc list-inside">
                  {dataRecipe.bahan_baku.map((el) => (
                    <li key={el}>{el}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5>Langkah Pembuatan</h5>
                <ul className="list-inside list-decimal">
                  {dataRecipe.langkah_pembuatan.map((el) => (
                    <li key={el}>{el}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <h5>Rekomendasi Makanan Pendamping</h5>
              <ul className="list-inside list-disc">
                {dataRecipe.makanan_pendamping.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <h5>Rekomendasi Minuman Pendamping</h5>
              <ul className="list-inside list-disc">
                {dataRecipe.minuman_pendamping.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <h1>Rekomendasi Makanan Sejenis</h1>
              <ul className="list-inside list-disc">
                {dataRecipe.makanan_mirip.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <h1>Rekomendasi Resep dari Cookpad</h1>
              <ul className="list-inside list-disc">
                {listCookpadRecipe.map((el) => (
                  <li key={`${el.title}${el.url}`}>
                    <Link href={`/cari${el.url}`}>{el.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex gap-5">
              <button>Share</button>
              <button>Simpan</button>
            </div>
          </>
        )} */}
      </div>
    </Layout>
  );
}
