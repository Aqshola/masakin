import { getCookpadListRecipe } from "@/utils/cookpad";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getCookpadListRecipe("nasi goreng");
  return NextResponse.json(result);
}
