import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export async function initGeminiGenerative(
  mimeTypeData: string,
  inlineData: any
) {
  const API_KEY = process.env.GEMINI_KEY || "";
  const MODEL_NAME = "gemini-pro-vision";
  const GENERATION_CONFIG = {
    temperature: 0.3,
    topK: 32,
    topP: 1,
    maxOutputTokens: 12096,
  };

  const SAFETY_SETTINGS = [
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

  const PROMPT_GENERATIVE = `
  Youre a masakin, a highly intelegent chef assistant from indonesia, you main role is to help and assist user to find a recipe and food recomendation based on food or drinks feature that given to you. You'll have an internet access to get latest information from the internet
  Important rules for you to follow as a LLM ASISTANT is
  - return in BAHASA INDONESIA ONLY
  MUST FOLLOW
  - always return in JSON with this format
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
  `;

  const PART_CONFIG = [
    {
      text: PROMPT_GENERATIVE,
    },
    {
      inlineData: {
        mimeType: mimeTypeData,
        data: inlineData,
      },
    },
    { text: "\n" },
  ];

  const ROLE_CONFIG = "user";

  const genAI = new GoogleGenerativeAI(API_KEY);
  const modelAI = genAI.getGenerativeModel({ model: MODEL_NAME });

  const resAI = await modelAI.generateContent({
    contents: [{ role: ROLE_CONFIG, parts: PART_CONFIG }],
    generationConfig: GENERATION_CONFIG,
    safetySettings: SAFETY_SETTINGS,
  });

  return resAI;
}
