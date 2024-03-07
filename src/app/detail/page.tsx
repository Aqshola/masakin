"use client";
import RecipeReader from "@/components/wrapper/recipe/RecipeReader";
import { RecipeCookpad, RecipeLocal } from "@/type/recipe";
import { getRecipeByKeyLocal } from "@/utils/client/flow";
import { fetcher } from "@/utils/common";


import { instanceOfRecipeLocal } from "@/utils/typing";
import { Base64 } from "js-base64";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Param = {
  searchParams: {
    type: string;
    url: string;
  };
};
export default function Index({ searchParams }: Param) {
  
  const parsedURL = searchParams.url ? Base64.decode(searchParams.url) : "";
  const isBookmark = searchParams.type == "bookmark";

  const { data, isLoading } = useSWR<RecipeCookpad>(
    isBookmark ? null : `/api/cookpad/${parsedURL}`,
    fetcher
  );

  const [dataView, setdataView] = useState<
    RecipeLocal | RecipeCookpad | undefined
  >(data);

  useEffect(() => {
    void getDataRecipe();
  }, []);

  useEffect(() => {
    if (!isBookmark) {
      setdataView(data);
    }
  }, [isLoading]);

  async function getDataRecipe() {
    if (isBookmark && parsedURL) {
      const dataIDB = await getRecipeByKeyLocal(parsedURL);
      if(dataIDB){
        setdataView(dataIDB);
      }
    }
  }

  return (
    <div className="h-full p-10 pb-20 relative min-h-screen w-full">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Resep Cookpad
      </h1>
      {!isLoading && !dataView && (
        <div>
          <h3 className="text-xl text-center mt-20">Yah, resepnya hilang 😔</h3>
        </div>
      )}
      {isLoading && (
        <div className="mt-28 w-full text-center">
          <p className="text-lg font-semibold">Memuat...</p>
        </div>
      )}
      {!isLoading && dataView && (
        <>
          <div className="w-full min-h-[350px] mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden relative">
            <Image
              fill
              src={dataView.img}
              alt={dataView?.nama_makanan}
              className="w-full h-full object-cover"
            />
          </div>

          <RecipeReader
            dataRecipe={dataView}
            image={dataView.img}
            type={instanceOfRecipeLocal(dataView) ? dataView.source : "cookpad"}
            url={parsedURL}
          />
        </>
      )}
    </div>
  );
}
