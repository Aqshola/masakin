"use client";
import {
  BookmarkSquareIcon as BookmarkSquareIconOutline,
  CameraIcon as CameraIconOutline,
  HomeIcon as HomeIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkSquareIcon as BookmarkSquareIconSolid,
  HomeIcon as HomeIconSolid,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import TransitionLink from "../Link/TransitionLink";
import { ChangeEvent, useContext, useRef } from "react";
import { CameraContext } from "@/contexts/camera/CameraContext";
import { ToastContext } from "@/contexts/toast/ToastContext";
import { getUploadImageData } from "@/utils/client/flow";
import { isImageFile } from "@/utils/validation";

//SHOULD USE INSIDE COMPONENT UNDER CAMERA CONTEXT
export default function BottomNav() {
  const cameraContext = useContext(CameraContext);
  const toastContext = useContext(ToastContext);

  const refInputCamera = useRef<HTMLInputElement>(null); //HANDLE CAMERA BUTTON

  const pathname = usePathname();
  const router = useRouter();

  function handleOpenCamera() {
    if (!refInputCamera) return;
    refInputCamera.current?.click();
  }

  async function handleUploadPicture(e: ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.currentTarget.files;
    if (!cameraContext) return;
    if (uploadedFile?.length == 0 || !uploadedFile) return;
    const imageFile = uploadedFile[0];
    const validImage = isImageFile(imageFile);
    if (!validImage) {
      toastContext?.create("Unggah foto aja ya");
      return;
    }

    const toast = toastContext?.create("Memuat foto...") || "";
    cameraContext?.setLoading(true);

    const dataUpload = await getUploadImageData(imageFile);
    cameraContext.setCamera(dataUpload.base64File, dataUpload.urlImage);
    cameraContext?.setLoading(false);

    if (pathname != "/cari") {
      router.push("/cari");
    }
  }

  return (
    <>
      <nav className="w-full flex fixed bottom-0 right-0 left-0 justify-between bottomnav-shadow max-w-2xl mx-auto">
        <div className="bg-white py-2 w-full flex items-center justify-start rounded-tl-xl px-10">
          <TransitionLink href={"/cari"}>
            {pathname == "/cari" ? (
              <HomeIconSolid className="w-8 h-8 fill-primary-orange" />
            ) : (
              <HomeIconOutline className="w-8 h-8" />
            )}
          </TransitionLink>
        </div>
        <div className="flex w-full transparent-bg justify-center relative">
          <button
            className=" flex bg-primary-orange absolute -bottom-7 w-14 h-14 p-2 rounded-full justify-center items-center rotate-180"
            onClick={handleOpenCamera}
          >
            <CameraIconOutline className="w-8 h-8 stroke-white" />
          </button>
        </div>
        <div className=" bg-white w-full flex justify-end items-center py-2 px-10 rounded-tr-xl overflow-hidden">
          <TransitionLink href={"/bookmark"}>
            {pathname == "/bookmark" ? (
              <BookmarkSquareIconSolid className="w-8 h-8 fill-primary-orange" />
            ) : (
              <BookmarkSquareIconOutline className="w-8 h-8" />
            )}
          </TransitionLink>
        </div>
      </nav>

      <input
        onChange={handleUploadPicture}
        ref={refInputCamera}
        type="file"
        name="image"
        accept="image/*"
        capture="environment"
        className="hidden"
      />
    </>
  );
}
