"use client";
import { getDataByKeyIDB } from "@/utils/indexDb";
import { getImageUrl } from "@/utils/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

type Param = {
  params: {
    id: string;
  };
};
export default function Index({ params }: Param) {
  const [dataRecipe, setDataRecipe] = useState<any>();

  useEffect(() => {}, []);

  async function getDataRecipe() {
    const dataIDB = await getDataByKeyIDB(params.id);
    console.log(dataIDB);
    setDataRecipe(dataIDB);
  }

  useEffect(() => {
    void getDataRecipe();
  }, []);

  if (!dataRecipe) return <div>Not found</div>;
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto p-10 relative">
      <h5 className="text-center mb-5">Bookmark</h5>
      <h1 className="text-center">{dataRecipe.nama_makanan}</h1>

      <div className="flex w-full h-[400px] relative mx-auto mt-5">
        <Image
          src={
            typeof dataRecipe.img === "string"
              ? dataRecipe.img
              : getImageUrl(dataRecipe.img)
          }
          fill
          alt={dataRecipe.nama_makanan}
          objectFit="cover"
        />
      </div>

      {dataRecipe.source === "generative" && (
        <div className="mt-10">{dataRecipe.deskripsi}</div>
      )}

      <div className="mt-10">
        <h2>Bahan baku</h2>
        <ul className="mt-4">
          {dataRecipe.bahan_baku.map((el: string) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2>Cara Pembuatan</h2>
        <ul className="mt-4">
          {dataRecipe.langkah_pembuatan.map((el: string) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
