import Image from "next/image";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { GenerativeResponse } from "@/type/recipe";
import { insertInDB } from "@/utils/indexDb";
import RecipeListBox from "./RecipeListBox";
import RecipeCookpadCardList from "./RecipeCookpadCardList";
import { CookpadListRecipe } from "@/utils/cookpad";
type Props = {
  dataRecipe: GenerativeResponse;
  listCookpadRecipe?: Array<CookpadListRecipe>;
  image: File | string;
};
export default function RecipeReader({
  listCookpadRecipe = [],
  ...props
}: Props) {
  async function handleSaveRecipe() {
    await insertInDB(
      { ...props.dataRecipe, source: "generative", img: props.image },
      `generative-${props.dataRecipe?.nama_makanan.replace(" ", "-")}`
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="bg-primary-orange p-2 bg-opacity-65 rounded flex justify-between text-primary-softblack items-start">
        <h2 className="text-3xl font-semibold  flex-wrap">
          {props.dataRecipe.nama_makanan}
        </h2>
        <button onClick={handleSaveRecipe}>
          <BookmarkIcon className="w-7 h-7 mt-1" />
        </button>
      </div>

      {/* DESC */}
      {props.dataRecipe.deskripsi && (
        <div className="bg-white p-2 rounded">
          <p className="text-sm leading-relaxed">
            {props.dataRecipe.deskripsi}
          </p>
        </div>
      )}

      <div className="bg-white p-2 rounded">
        <h3 className="text-lg font-bold mb-2">Resep</h3>
        <RecipeListBox listData={props.dataRecipe.bahan_baku} />
      </div>

      <div className="bg-white p-2 rounded">
        <h3 className="text-lg font-bold mb-2">Cara Pembuatan</h3>
        <RecipeListBox listData={props.dataRecipe.langkah_pembuatan} />
      </div>

      {listCookpadRecipe.length > 0 && (
        <div className="w-full bg-white p-2 rounded">
          <h3 className="text-lg font-bold mb-2">Resep Cookpad</h3>
          <RecipeCookpadCardList listData={listCookpadRecipe} />
        </div>
      )}
    </div>
  );
}
