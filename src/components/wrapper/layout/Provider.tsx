"use client";

import CameraProvider from "@/contexts/camera/CameraContext";
import ToastProvider from "@/contexts/toast/ToastContext";
import { initDb } from "@/utils/indexDb";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};
export default function Provider({ children }: Props) {
  useEffect(() => {
    void initDb();
  }, []);
  return (
    <>
      <ToastProvider>
        <CameraProvider>{children}</CameraProvider>
      </ToastProvider>
    </>
  );
}
