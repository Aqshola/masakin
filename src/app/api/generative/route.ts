import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { getCookpadListRecipe } from "@/utils/cookpad";
import { getIpRequest, setLoadingState } from "@/utils/network";
import { redisClient } from "@/libs/redis";

export async function POST(request: NextRequest) {
  const ip = getIpRequest(request);

  const redis = redisClient;
  const keyRedisLoading = `${ip}-loading`;

  setLoadingState(redis, keyRedisLoading, {
    percent: 10,
    state: "Getting data",
  });
  const data = await request.formData();
  const imageData = data.get("image") as File;
  const byteImage = await imageData.arrayBuffer();

  const API_KEY = process.env.GEMINI_KEY || "";
  const MODEL_NAME = "gemini-pro-vision";

  setLoadingState(redis, keyRedisLoading, {
    percent: 30,
    state: "Initiate Generative",
  });
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.3,
    topK: 32,
    topP: 1,
    maxOutputTokens: 12096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const parts = [
    {
      text: `
      Youre a masakin, a highly intelegent chef assistant from indonesia, you main role is to help and assist user to find a recipe and food recomendation based on food or drinks feature that given to you. You'll have an internet access to get latest information from the internet
      Important rules for you to follow as a LLM ASISTANT is
      - return in BAHASA INDONESIA ONLY
      - ALWAYS return in JSON with this format
        " 
          deskripsi (string)
          makanan_pendamping (array of string)
          minuman_pendamping (array of string)
          nama_makanan (string)
          bahan_baku  (array of string)
          langkah_pembuatan (array of string)
          makanan_mirip (array of string)  
          status (string found or not_found)
      "
      `,
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(byteImage).toString("base64"),
      },
    },
    { text: "\n" },
  ];

  setLoadingState(redis, keyRedisLoading, {
    percent: 50,
    state: "Generate content",
  });
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  setLoadingState(redis, keyRedisLoading, {
    percent: 60,
    state: "Finish generate",
  });

  const responseGemini = result.response;

  const parsedResponseGemini = JSON.parse(responseGemini.text());

  setLoadingState(redis, keyRedisLoading, {
    percent: 70,
    state: "Generate cookpad recomendation",
  });
  const cookpadRecipe = await getCookpadListRecipe(
    parsedResponseGemini.nama_makanan
  );

  setLoadingState(redis, keyRedisLoading, {
    percent: 100,
    state: "Finish process",
  });
  setTimeout(() => {
    setLoadingState(redis, keyRedisLoading, {
      percent: 0,
      state: "",
    });
  }, 1500);
  return NextResponse.json({
    generativeResponse: parsedResponseGemini,
    listCookpadRecipe: cookpadRecipe,
  });
}
