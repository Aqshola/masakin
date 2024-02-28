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

  const { data, error, isLoading } = useSWR<CookpadRecipeResponse>(
    `/api/cookpad/${parsedURL}`,
    fetcher
  );

  async function handleSaveRecipe() {
    await insertInDB(
      { ...data, source: "cookpad" },
      `cookpad-${parsedURL.replaceAll("/", "-")}`
    );
  }

  return (
    <Layout title="Resep Cookpad">
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
              className="w-full h-full"
              objectFit="cover"
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
    </Layout>
  );
}
