"use client";
import RecipeReader from "@/components/wrapper/Recipe/RecipeReader";
import Layout from "@/components/wrapper/layout/Layout";
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
    setDataRecipe(dataIDB);
  }

  useEffect(() => {
    void getDataRecipe();
  }, []);

  if (!dataRecipe) return <div>Not found</div>;
  return (
    <Layout>
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Bookmark Resep
      </h1>
      {dataRecipe && (
        <>
          <div className="w-full min-h-[350px] mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden relative">
            <Image
              fill
              src={dataRecipe.img}
              alt={dataRecipe.nama_makanan}
              className="w-full h-full object-cover"
            />
          </div>

          <RecipeReader
            dataRecipe={dataRecipe}
            image={dataRecipe.img}
            type="cookpad"
            buttonBookmark={false}
          />
        </>
      )}
    </Layout>
  );
}
