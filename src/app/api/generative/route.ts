import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

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
      text: "Please provide details about this food photo, including its recipe with amount, how to make, list of related foods as array, similiar foods as array and  if its a drink write list of recommendations for side dishes if not write list of recomendations for drinks as array. \nprovide the information in Indonesian and always write in json in this format \n{\n  deskripsi\n  makanan_pendamping\n  minuman_pendamping\n  nama_makanan\n  bahan_baku\n  langkah_pembuatan\n makanan_mirip \n}\n",
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

  return NextResponse.json({
    generativeResponse: JSON.parse(responseGemini.text()),
  });
}
