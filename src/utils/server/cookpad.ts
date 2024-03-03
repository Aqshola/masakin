import { RecipeCookpad, RecipeCookpadMini } from "@/type/recipe";
import { load } from "cheerio";
import { cleanTextOnlyFromHTML } from "../formatter";

export async function getCookpadListRecipe(food: string) {
  //SELECTOR
  const LIST_SELECTOR = 'li[itemprop="itemListElement"]';
  const TITLE_SELECTOR = "h2 a";
  const IMAGE_SELECTOR = ".w-20 picture img";

  const result = await fetch(`https://cookpad.com/id/cari/${food}`, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
  const resultData = await result.text();

  const render = load(resultData);

  const listRecipe: Array<RecipeCookpadMini> = [];
  render(LIST_SELECTOR).each((_, el) => {
    const list = render(el).find(TITLE_SELECTOR);

    const title = cleanTextOnlyFromHTML(list.text());
    const url = list.attr("href") || "";
    const image = render(el).find(IMAGE_SELECTOR).attr("src") || "";

    listRecipe.push({
      title,
      url,
      image,
    });
  });
  return listRecipe;
}

export async function getCookpadRecipe(url: string) {
  //SELECTOR
  const IMAGE_SELECTOR = "#recipe_image";
  const TITLE_SELECTOR = "h1";
  const INGRIDIENT_LIST_SELECTOR = ".ingredient-list li";
  const STEP_LIST_SELECTOR = "#steps li";

  const result = await fetch(`https://cookpad.com/${url}`, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
  const resultData = await result.text();

  const render = load(resultData);

  const listIngridients: string[] = [];
  const listSteps: string[] = [];

  const image = render(IMAGE_SELECTOR).find("img").attr("src") || "";
  const title = render(TITLE_SELECTOR).text();

  render(INGRIDIENT_LIST_SELECTOR).each((_, element) => {
    const text = render(element).text();
    listIngridients.push(text);
  });

  render(STEP_LIST_SELECTOR).each((_, element) => {
    const text = render(element).text();
    listSteps.push(text);
  });

  const returObject: RecipeCookpad = {
    img: image,
    bahan_baku: listIngridients,
    deskripsi: "",
    langkah_pembuatan: listSteps,
    nama_makanan: title,
  };
  return returObject;
}
