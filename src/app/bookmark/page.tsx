"use client";
import { getAllDataIDB } from "@/utils/indexDb";
import { useEffect, useState } from "react";

export default function Index() {
  const [dataBookmark, setDataBookmark] = useState<Array<any>>([]);

  useEffect(() => {
    void getDataBookmark();
  }, []);

  async function getDataBookmark() {
    const dataIDB = await getAllDataIDB();
    setDataBookmark(dataIDB);
  }

  return (
    <>
      <div className="min-h-screen p-10 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-medium">Daftar Resep</h1>
        <div className="mt-10 flex flex-col gap-3">
          {dataBookmark.map((el, idx) => (
            <div className="border p-2 rounded" key={el.key}>
              {el.nama_makanan}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
