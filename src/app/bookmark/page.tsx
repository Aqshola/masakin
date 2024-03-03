"use client";
import TransitionLink from "@/components/base/Link/TransitionLink";
import { getAllDataIDB } from "@/utils/indexDb";
import { Base64 } from "js-base64";
import { useRouter } from "next/navigation";
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
    <div className="h-full p-10 pb-20 relative">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Buku Resep
      </h1>
      <div className="mt-10 flex flex-col gap-3 bg-white p-2 rounded">
        {dataBookmark.length == 0 && <div>Gaada resep yang kesimpen 😔</div>}
        {dataBookmark.length > 0 &&
          dataBookmark.map((el) => (
            <TransitionLink
              href={`/detail?url=${Base64.encode(el.key)}&type=bookmark`}
              key={el.key}
            >
              <div className="border p-2 rounded text-left">
                {el.nama_makanan}
              </div>
            </TransitionLink>
          ))}
      </div>
    </div>
  );
}
