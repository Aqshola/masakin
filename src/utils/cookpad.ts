import { CookpadRecipeResponse, GenerativeResponse } from "@/type/recipe";
import { load } from "cheerio";

export type CookpadListRecipe = {
  title: string;
  url: string;
  image: string;
};
export async function getCookpadListRecipe(food: string) {
  const result = await fetch(`https://cookpad.com/id/cari/${food}`, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
  const resultData = await result.text();

  const render = load(resultData);

  const listRecipe: Array<CookpadListRecipe> = [];
  render('li[itemprop="itemListElement"]').each((_, el) => {
    const list = render(el).find("h2 a");
    const title = list
      .text()
      .replace(/\n/g, "")
      .replace(/[0-9.]/g, " ")
      .trimStart();
    const url = list.attr("href") || "";
    const image = render(el).find(".w-20 picture img").attr("src") || "";

    listRecipe.push({
      title,
      url,
      image,
    });
  });
  return listRecipe;
}
export async function getCookpadRecipe(url: string) {
  const result = await fetch(`https://cookpad.com/${url}`, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
  const resultData = await result.text();

  const render = load(resultData);

  const listIngridients: string[] = [];
  const listSteps: string[] = [];

  const image = render("#recipe_image").find("img").attr("src") || "";
  const title = render("h1").text();

  render(".ingredient-list li").each((_, element) => {
    const text = render(element).text();
    listIngridients.push(text);
  });

  render("#steps li").each((_, element) => {
    const text = render(element).text();
    listSteps.push(text);
  });

  const returObject: CookpadRecipeResponse = {
    img: image,
    bahan_baku: listIngridients,
    deskripsi: "",
    langkah_pembuatan: listSteps,
    makanan_mirip: [],
    makanan_pendamping: [],
    minuman_pendamping: [],
    nama_makanan: title,
  };
  return returObject;
}
