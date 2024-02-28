import { GenerativeResponse } from "@/type/recipe";
import { getDataByKeyIDB, insertInDB } from "./indexDb";
import { getImageUrl } from "./ui";

export async function saveRecipe(
  dataRecipe: GenerativeResponse,
  img: File | string,
  type: "cookpad" | "generative",
  url?: string //only for cookpad
) {
  try {
    let key = generateKeyRecipe(type,url,dataRecipe.nama_makanan);
    

    await insertInDB({ ...dataRecipe, img, source: type }, key);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getLocalRecipe(key: string) {
  const dataIDB = await getDataByKeyIDB(key);
  let img = "";
  if (dataIDB.source == "generative") {
    img = getImageUrl(dataIDB.img);
  }

  return {
    ...dataIDB,
    img,
  };
}


export function generateKeyRecipe(type:'cookpad'|'generative',url?:string, foodName?:string){
    if (type=='cookpad' && url) {
      return url.replaceAll("/", "-");
    }

    if (type == "generative" && foodName) {
      return `generative-${foodName.replace(" ", "-")}`;
    }
    return ''

}