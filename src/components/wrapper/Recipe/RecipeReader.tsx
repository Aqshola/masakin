import { BookmarkIcon } from "@heroicons/react/24/outline";
import { GenerativeResponse } from "@/type/recipe";
import RecipeListBox from "./RecipeListBox";
import RecipeCookpadCardList from "./RecipeCookpadCardList";
import { CookpadListRecipe } from "@/utils/cookpad";
import { saveRecipe } from "@/utils/helper";
type Props = {
  dataRecipe: GenerativeResponse;
  listCookpadRecipe?: Array<CookpadListRecipe>;
  image: File | string;
  type: "cookpad" | "generative";
  url?: string; //only for cookpad
  buttonBookmark?: boolean;
};
export default function RecipeReader({
  listCookpadRecipe = [],
  buttonBookmark = true,
  ...props
}: Props) {
  async function handleSaveRecipe() {
    let result: boolean;

    if (props.type == "cookpad") {
      result = await saveRecipe(
        props.dataRecipe,
        props.image,
        props.type,
        props.url
      );
    } else {
      result = await saveRecipe(props.dataRecipe, props.image, props.type);
    }

    if (result) {
      alert("Ok");
    }
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="bg-primary-orange p-2 bg-opacity-65 rounded flex justify-between text-primary-softblack items-start">
        <h2 className="text-3xl font-semibold  flex-wrap">
          {props.dataRecipe.nama_makanan}
        </h2>
        {buttonBookmark && (
          <button onClick={handleSaveRecipe}>
            <BookmarkIcon className="w-7 h-7 mt-1" onClick={handleSaveRecipe} />
          </button>
        )}
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
