import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { getCookpadListRecipe } from "@/utils/cookpad";

export async function POST(request: Request) {
  const data = await request.formData();
  const imageData = data.get("image") as File;
  const byteImage = await imageData.arrayBuffer();

  const API_KEY = process.env.GEMINI_KEY || "";
  const MODEL_NAME = "gemini-pro-vision";

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

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const responseGemini = result.response;

  const parsedResponseGemini = JSON.parse(responseGemini.text());
  const cookpadRecipe = await getCookpadListRecipe(
    parsedResponseGemini.nama_makanan
  );

  return NextResponse.json({
    generativeResponse: parsedResponseGemini,
    listCookpadRecipe: cookpadRecipe,
  });
}
