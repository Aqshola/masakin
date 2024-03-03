"use client";
import RecipeReader from "@/components/wrapper/Recipe/RecipeReader";
import { CookpadRecipeResponse, GenerativeResponse } from "@/type/recipe";
import { getDataByKeyIDB } from "@/utils/indexDb";
import { fetcher } from "@/utils/network";
import { Base64 } from "js-base64";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { isArray } from "util";

type Param = {
  searchParams: {
    type: string;
    url: string;
  };
};
export default function Index({ searchParams }: Param) {
  const parsedURL = Base64.decode(searchParams.url);
  const isBookmark = searchParams.type == "bookmark";

  const { data, isLoading } = useSWR<CookpadRecipeResponse>(
    isBookmark ? null : `/api/cookpad/${parsedURL}`,
    fetcher
  );

  const [dataView, setdataView] = useState<any>(data);

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
      const dataIDB = await getDataByKeyIDB(parsedURL);
      setdataView(dataIDB);
    }
  }

  return (
    <div className="h-full p-10 pb-20 relative min-h-screen w-full">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Resep Cookpad
      </h1>
      {isLoading && (
        <div className="mt-28 w-full text-center">
          <p className="text-lg font-semibold">Loading...</p>
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
            type={dataView.type || "cookpad"}
            url={parsedURL}
            // buttonBookmark={!isBookmark}
          />
        </>
      )}
    </div>
  );
}
