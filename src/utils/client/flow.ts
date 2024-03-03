import { Recipe, RecipeLocal, RecipeType } from "@/type/recipe";
import imageCompression from "browser-image-compression";
import { deleteKeyIDB, getDataByKeyIDB, insertKeyIDB } from "./indexedDB";

// RECIPE LOCAL FLOW

export const MASAKIN_IDB_NAME = "masakin-db";
export const MASAKIN_IDB_VERSION = 1;
export const MASAKIN_IDB_STORE_NAME = "masakin-bookmark";

export function generateKeyRecipeLocal(
  type: RecipeType,
  url?: string,
  foodName?: string
) {
  if (type == "cookpad" && url) {
    return url.replaceAll("/", "-");
  }

  if (type == "generative" && foodName) {
    return `generative-${foodName.replace(" ", "-")}`;
  }
  return "";
}

export async function saveRecipeLocal(
  dataRecipe: Recipe,
  img: File | string,
  type: RecipeType,
  url?: string //only for cookpad
) {
  const key = generateKeyRecipeLocal(type, url, dataRecipe.nama_makanan);
  await insertKeyIDB(
    { ...dataRecipe, img, source: type },
    key,
    MASAKIN_IDB_NAME,
    MASAKIN_IDB_STORE_NAME,
    MASAKIN_IDB_VERSION
  );
}

export async function deleteRecipeLocal(key: string) {
  deleteKeyIDB(
    key,
    MASAKIN_IDB_STORE_NAME,
    MASAKIN_IDB_NAME,
    MASAKIN_IDB_VERSION
  );
}

export async function getRecipeByKeyLocal(
  key: string
): Promise<RecipeLocal | null> {
  const dataIDB = (await getDataByKeyIDB(
    key,
    MASAKIN_IDB_STORE_NAME,
    MASAKIN_IDB_NAME,
    MASAKIN_IDB_VERSION
  )) as RecipeLocal;

  return dataIDB;
}

// IMAGE HANDLER FLOW
export function imageToBase64(file: File): Promise<string> {
  const promise: Promise<string> = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

  return promise;
}

export function base64ToImage(base64: string): File | null {
  const arr = base64.split(",");
  if (arr.length > 0) {
    const mime = arr[0].match(/:(.*?);/);
    let parsedMime = mime ? mime[1] : "";
    let bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], "File", { type: parsedMime });
  }

  return null;
}

export async function frontendCompressImage(file: File) {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    useWebWorker: true,
  });
  return compressedFile;
}

export function getImageUrl(file: File) {
  if (!file) return "";
  return URL.createObjectURL(file);
}

export async function getUploadImageData(imageFile: File) {
  const compress = await frontendCompressImage(imageFile);
  const base64File = await imageToBase64(compress);
  const urlImage = getImageUrl(imageFile);

  return {
    compress,
    base64File,
    urlImage,
  };
}
