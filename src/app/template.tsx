"use client";

import Layout from "@/components/wrapper/layout/Layout";
import CameraProvider from "@/contexts/camera/CameraContext";
import { animatePageIn } from "@/libs/animation";
import { clearStorageState } from "@/utils/presistent";
import { eventWindowBeforeClose } from "@/utils/ui";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  useEffect(() => {
    eventWindowBeforeClose(clearStorageState);
    return () => {
      window.removeEventListener("unload", () => {});
    };
  }, []);
  return <Layout>{children}</Layout>;
}
