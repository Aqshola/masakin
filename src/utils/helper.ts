import { GenerativeResponse } from "@/type/recipe";
import { getDataByKeyIDB, insertInDB } from "./indexDb";
import { getImageUrl } from "./ui";
import sharp from "sharp";
import imageCompression from "browser-image-compression";

export async function saveRecipe(
  dataRecipe: GenerativeResponse,
  img: File | string,
  type: "cookpad" | "generative",
  url?: string //only for cookpad
) {
  try {
    let key = generateKeyRecipe(type, url, dataRecipe.nama_makanan);

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

export function generateKeyRecipe(
  type: "cookpad" | "generative",
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

// HANDLE IMAGE
export const imageToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const base64ToFile = (base64: string) => {
  const arr = base64.split(",");
  if (arr.length > 0) {
    const mime = arr[0].match(/:(.*?);/);
    let parsedMime = mime ? mime[1] : '';
    let bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'File', {type:parsedMime});
  }

  return null
};

export const compressImage= async (file:File)=>{
  const compressedFile= await imageCompression(file, {
    maxSizeMB:1,
    useWebWorker:true
  })

  return compressedFile
}
