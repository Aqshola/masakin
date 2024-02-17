import { load } from "cheerio";

export type CookpadListRecipe = {
  title: string;
  url: string;
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
    const url = list.attr("href");

    listRecipe.push({
      title: title,
      url: `https://cookpad.com${url}`,
    });
  });
  return listRecipe;
}
