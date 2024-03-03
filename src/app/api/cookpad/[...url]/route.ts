import { getCookpadRecipe } from "@/utils/server/cookpad";
import { NextResponse } from "next/server";

type Context = {
  params: {
    url: string[];
  };
};
export async function GET(_: any, context: Context) {
  const { url } = context.params;
  const parsedURL = url.join("/");

  const result = await getCookpadRecipe(parsedURL);
  return NextResponse.json(result);
}
