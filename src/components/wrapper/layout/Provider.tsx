"use client";

import CameraProvider from "@/contexts/camera/CameraContext";
import ToastProvider from "@/contexts/toast/ToastContext";
import { initDBRecipeLocal } from "@/utils/client/flow";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};
export default function Provider({ children }: Props) {
  useEffect(() => {
    void initDBRecipeLocal()
  }, []);
  return (
    <>
      <ToastProvider>
        <CameraProvider>{children}</CameraProvider>
      </ToastProvider>
    </>
  );
}
