"use client";
import FloatingButton from "@/components/base/button/FloatingButton";
import RecipeReader from "@/components/wrapper/Recipe/RecipeReader";
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

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) return "no Data";
  return (
    <div className="h-full p-10 pb-20 relative">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Resep Cookpad
      </h1>

      <div className="w-full min-h-[350px] mt-10 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden relative">
        <div className="w-full min-h-[350px] flex justify-center items-center relative overflow-hidden">
          <Image
            fill
            src={data.img}
            alt={data?.nama_makanan}
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
      </div>

      <RecipeReader dataRecipe={data} image={data.img} listCookpadRecipe={[]} />
    </div>
  );
}
