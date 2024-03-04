"use client";

import Layout from "@/components/wrapper/layout/Layout";
import { animatePageIn } from "@/libs/animation";
import { eventWindowBeforeClose } from "@/utils/client/event";
import { clearPresistentState } from "@/utils/client/flow";

import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  useEffect(() => {
    eventWindowBeforeClose(clearPresistentState);
    return () => {
      window.removeEventListener("unload", () => {});
    };
  }, []);
  return <Layout>{children}</Layout>;
}
