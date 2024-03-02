"use client";

import CameraProvider from "@/contexts/camera/CameraContext";
import ToastProvider from "@/contexts/toast/ToastContext";

type Props = {
  children: React.ReactNode;
};
export default function Provider({ children }: Props) {
  return (
    <>
      <ToastProvider>
        <CameraProvider>{children}</CameraProvider>
      </ToastProvider>
    </>
  );
}
