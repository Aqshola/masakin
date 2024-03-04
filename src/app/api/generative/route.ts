import { NextRequest, NextResponse } from "next/server";



import { redisClient } from "@/libs/redis";
import {
  getIpRequest,
  getCompressedImage,
  setLoadingRedis,
} from "@/utils/server/network";
import { initGeminiGenerative } from "@/libs/gemini";
import { Recipe } from "@/type/recipe";
import { getCookpadListRecipe } from "@/utils/server/cookpad";

export async function POST(request: NextRequest) {
  
  //INITIATE
  const ip = getIpRequest(request);
  const redis = redisClient;

  setLoadingRedis(redis, ip, { percent: 10, state: "Getting Request" });

  const data = await request.formData();
  const imageData = data.get("image") as File;
  const imageCompressed = await getCompressedImage(imageData);

  setLoadingRedis(redis, ip, { percent: 40, state: "Running Model" });

  const modelResult = await initGeminiGenerative(
    "image/jpeg",
    imageCompressed.toString("base64")
  );
  const responseModel = modelResult.response;
  const jsonResponseModel = JSON.parse(responseModel.text()) as Recipe;

  setLoadingRedis(redis, ip, { percent: 70, state: "Getting Cookpad" });

  const cookpadRecipeList = await getCookpadListRecipe(
    jsonResponseModel.nama_makanan
  );

  setLoadingRedis(redis, ip, { percent: 100, state: "Finish Process" });
  setTimeout(() => {
    setLoadingRedis(redis, ip, { percent: 0, state: "" }); //RESET
  }, 1500);
  return NextResponse.json({
    generativeResponse: jsonResponseModel,
    listCookpadRecipe: cookpadRecipeList,
  });
}
