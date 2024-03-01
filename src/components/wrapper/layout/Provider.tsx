"use client";

import CameraProvider from "@/contexts/camera/CameraContext";

type Props = {
  children: React.ReactNode;
};
export default function Provider({ children }: Props) {
  return <CameraProvider>{children}</CameraProvider>;
}
