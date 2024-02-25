"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getImageUrl } from "@/utils/ui";
import axios from "axios";
import { GenerativeResponse } from "@/type/recipe";
import { CookpadListRecipe } from "@/utils/cookpad";
import Link from "next/link";
import FloatingButton from "@/components/button/FloatingButton";
import { insertInDB } from "@/utils/indexDb";
import Layout from "@/components/layout/Layout";

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
      <div className="h-full p-10 pb-20 relative bg-primary-softwhite">
        <h1 className="text-xl font-semibold text-primary-softblack ">
          Cari Resep
        </h1>

        {/* IMAGE */}
        <div className="w-full min-h-[350px] border-4 border-primary-orange mt-10 rounded-lg flex flex-col items-center justify-center bg-white">
          {!currentImage && (
            <div className="flex flex-col gap-5">
              <button
                className="text-sm font-semibold flex gap-2 items-center"
                onClick={handleOpenUploadPicture}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
                <span>Unggah foto</span>
              </button>
              <button className="text-sm font-semibold flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                <span>Ambil foto</span>
              </button>
            </div>
          )}
        </div>

        {/* <button className="mt-5 py-2 px-5 bg-primary-orange font-semibold rounded-lg w-full text-white">
          Cari
        </button> */}

        <div className="mt-5 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold text-primary-softblack bg-primary-orange p-2 bg-opacity-65 rounded">
            Soto Ayam
          </h2>

          {/* DESC */}
          <div className="bg-white p-2 rounded">
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
              quo magnam commodi. Necessitatibus aperiam explicabo optio
              excepturi distinctio accusamus beatae?
            </p>
          </div>

          <div className="bg-white p-2 rounded">
            <h3 className="text-lg font-bold mb-2">Resep</h3>
            <ul>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
            </ul>
          </div>

          <div className="bg-white p-2 rounded">
            <h3 className="text-lg font-bold mb-2">Cara Pembuatan</h3>
            <ul>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
            </ul>
          </div>

          <div className="w-full bg-white p-2 rounded">
            <h3 className="text-lg font-bold mb-2">Resep Cookpad</h3>
            <div className="flex overflow-x-scroll gap-3 py-3">
              <div>
                <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
                  <div className="p-2 w-full h-[150px] relative">
                    <Image
                      src={"/img/placeholder_nasigoreng.jpg"}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h4 className="font-semibold">Nasi goreng ibu rohmah</h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
                  <div className="p-2 w-full h-[150px] relative">
                    <Image
                      src={"/img/placeholder_nasigoreng.jpg"}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h4 className="font-semibold">Nasi goreng ibu rohmah</h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
                  <div className="p-2 w-full h-[150px] relative">
                    <Image
                      src={"/img/placeholder_nasigoreng.jpg"}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h4 className="font-semibold">Nasi goreng ibu rohmah</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {dataRecipe && !loading && (
          <FloatingButton onClick={handleSaveRecipe} />
        )}
        <div className="flex flex-col items-center gap-5 ">
          <h1 className="text-center">Cari Resep</h1>
          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-5">
              <button className="border p-2" onClick={handleOpenCamera}>
                Buka Kamera
              </button>
              <button className="border p-2" onClick={handleOpenUploadPicture}>
                Upload
              </button>
            </div>

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
