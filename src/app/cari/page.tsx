"use client";

import Image from "next/image";
import { ChangeEvent, DragEventHandler, useRef, useState } from "react";
import { getImageUrl, isOpenInMobile } from "@/utils/ui";
import axios from "axios";

type currentImage = {
  file: File;
  url: string;
};

export default function Index() {
  const refInputPictureHidden = useRef<HTMLInputElement | null>(null);
  const refInputCamera = useRef<HTMLInputElement | null>(null);
  const [currentImage, setCurrentImage] = useState<currentImage>();
  const [loading, setLoading] = useState<boolean>(false);
  const isOpenMobile = isOpenInMobile();

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

  function handleDragAndDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleFileOnDrop(e: DragEvent<HTMLDivElement>) {
    handleDragAndDrop(e);
    const dataTransfer = e.dataTransfer;
    if (!dataTransfer) return;
    const files = dataTransfer?.files;
    setterCurrentImage(files);
  }

  async function handleSearchMasak() {
    if (currentImage) {
      setLoading(true);
      const data = new FormData();
      data.set("image", currentImage.file);
      const res = await axios.post("/api/generative", data);
      console.log(res, "tes");
      setLoading(false);
    }
  }

  if (loading) return "Loading...";

  return (
    <div
      className="min-h-screen p-10 max-w-screen-2xl border"
      draggable
      onDragEnter={handleDragAndDrop}
      onDragOver={handleDragAndDrop}
      onDragLeave={handleDragAndDrop}
      onDrag={handleDragAndDrop}
      onDrop={handleFileOnDrop}
    >
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-center">Cari Resep</h1>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-5">
            {isOpenMobile && (
              <button className="border p-2" onClick={handleOpenCamera}>
                Buka Kamera
              </button>
            )}
            <button className="border p-2" onClick={handleOpenUploadPicture}>
              Upload
            </button>
          </div>
          {isOpenMobile && (
            <input
              onChange={handleUploadPicture}
              ref={refInputCamera}
              type="file"
              name="image"
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          )}
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

      <div className="mt-10 pt-2 flex flex-col items-center gap-5">
        <button>Respe makanan aba</button>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          earum voluptatum ad totam ea commodi sint quibusdam quae laborum
          tenetur qui accusamus, dolor ducimus aspernatur assumenda, deleniti
          eveniet eum quis. Accusantium voluptate numquam voluptatum. Commodi
          tempora pariatur eum incidunt? Aperiam nemo alias nesciunt debitis
          iusto nulla a accusantium. Voluptates, adipisci.
        </p>
      </div>
      <div className="mt-5">
        <h1>Rekomendasi Makanan Pendamping</h1>
      </div>
      <div className="mt-5">
        <h1>Rekomendasi Makanan Sejenis</h1>
      </div>

      <div className="mt-5 flex gap-5">
        <button>Share</button>
        <button>Simpan</button>
      </div>
    </div>
  );
}
