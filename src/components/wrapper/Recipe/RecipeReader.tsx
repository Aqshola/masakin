import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { Recipe, RecipeCookpad, RecipeCookpadMini, RecipeLocal, RecipeType } from "@/type/recipe";
import RecipeListBox from "./RecipeListBox";
import RecipeCookpadCardList from "./RecipeCookpadCardList";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/toast/ToastContext";
import { useRouter } from "next/navigation";
import {
  deleteRecipeLocal,
  generateKeyRecipeLocal,
  generateUrlDetailRecipeLocal,
  getRecipeByKeyLocal,
  saveRecipeLocal,
} from "@/utils/client/flow";
type Props = {
  dataRecipe: Recipe | RecipeLocal | RecipeCookpad;
  listCookpadRecipe?: Array<RecipeCookpadMini>;
  image: string;
  type: RecipeType;
  url?: string; //only for cookpad
  buttonBookmark?: boolean;
};
export default function RecipeReader({
  listCookpadRecipe = [],
  buttonBookmark = true,
  ...props
}: Props) {

  const router = useRouter();
  const toast = useContext(ToastContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    void checkRecipeSaved();
  }, []);

  async function handleSaveRecipe() {
    const key = generateKeyRecipeLocal(
      props.type,
      props.url,
      props.dataRecipe.nama_makanan
    );
    const urlDetail=generateUrlDetailRecipeLocal(key)

    if (isSaved) {
      deleteRecipeLocal(key);
      setIsSaved(false);
      toast?.create("Dihapus dari bookmark");
      return;
    }

    await saveRecipeLocal(props.dataRecipe, props.image, props.type, props.url);
    toast?.create('Ditambah ke bookmark')
    setIsSaved(true)
    router.prefetch(urlDetail)
  }

  async function checkRecipeSaved() {
    const key = generateKeyRecipeLocal(
      props.type,
      props.url,
      props.dataRecipe.nama_makanan
    );
    const data = await getRecipeByKeyLocal(key);
    if (data) {
      setIsSaved(true);
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
            {isSaved ? (
              <BookmarkIconSolid className="w-7 h-7 mt-1" />
            ) : (
              <BookmarkIconOutline className="w-7 h-7 mt-1" />
            )}
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
