"use client";

import { initDb } from "@/utils/indexDb";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    void initDb();
    const eventSource = new EventSource("/api/loading");
    eventSource.addEventListener("myEventName", (e) => {
      // the event name here must be the same as in the API
      console.log(JSON.parse(e.data));
    });
    eventSource.addEventListener("open", (e) => {
      console.log("open", e);
    });
    eventSource.addEventListener("error", (e) => {
      eventSource.close();
    });
  }, []);

  return (
    <main className="w-full">
      <div className="flex justify-center items-center bg-white min-h-screen flex-col gap-5">
        <h1>Masakin</h1>
        <p>Cari resep yang mau kamu masak</p>
        <button>Cari</button>
      </div>
    </main>
  );
}
