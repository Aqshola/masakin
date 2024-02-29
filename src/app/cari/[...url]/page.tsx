"use client";
import FloatingButton from "@/components/base/button/FloatingButton";
import RecipeReader from "@/components/wrapper/Recipe/RecipeReader";
import Layout from "@/components/wrapper/layout/Layout";
import { CookpadRecipeResponse, GenerativeResponse } from "@/type/recipe";
import { insertInDB } from "@/utils/indexDb";
import { fetcher } from "@/utils/network";
import Image from "next/image";
import useSWR from "swr";

type Param = {
  params: {
    url: string[];
  };
};
export default function Index({ params }: Param) {
  const parsedURL = params.url.join("/");

  const { data, isLoading } = useSWR<CookpadRecipeResponse>(
    `/api/cookpad/${parsedURL}`,
    fetcher
  );

  return (
    <div className="h-full p-10 pb-20 relative">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Resep Cookpad
      </h1>
      {isLoading && (
        <div className="mt-28 w-full text-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}
      {!isLoading && data && (
        <>
          <div className="w-full min-h-[350px] mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden relative">
            <Image
              fill
              src={data.img}
              alt={data?.nama_makanan}
              className="w-full h-full object-cover"
              
            />
          </div>

          <RecipeReader
            dataRecipe={data}
            image={data.img}
            type="cookpad"
            url={parsedURL}
          />
        </>
      )}
    </div>
  );
}
