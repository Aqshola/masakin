"use client";
import Layout from "@/components/wrapper/layout/Layout";
import { getAllDataIDB } from "@/utils/indexDb";
import Link from "next/link";
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
    <Layout>
      <div className="min-h-screen p-10 max-w-screen-2xl mx-auto">
        <h1 className="text-xl font-semibold text-primary-softblack ">
          Buku Resep
        </h1>
        <div className="mt-10 flex flex-col gap-3 bg-white p-2 rounded">
          {dataBookmark.map((el, idx) => (
            <Link href={`/bookmark/${el.key}`} key={el.key}>
              <div className="border p-2 rounded">{el.nama_makanan}</div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
