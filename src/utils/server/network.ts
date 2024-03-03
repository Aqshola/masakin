import { redisClient } from "@/libs/redis";
import { Loading } from "@/type/loading";
import sharp from "sharp";

export function getIpRequest(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  return ip;
}

//REDIS
function generateRedisKeyLoading(ip: string) {
  return `REDISKEY-${ip}-LOADING`;
}

export async function setLoadingRedis(
  redis: typeof redisClient,
  ip: string,
  data: Loading
) {
  const keyLoading = generateRedisKeyLoading(ip);
  await redis.set(keyLoading, JSON.stringify(data));
}

export async function getLoadingRedis(redis: typeof redisClient, ip: string) {
  const keyLoading = generateRedisKeyLoading(ip);
  const value = await redis.get(keyLoading);
  return value;
}

export async function getCompressedImage(imageFile: File) {
  const imageByte = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(imageByte);

  const imageCompressed = await sharp(imageBuffer)
    .jpeg({ quality: 50 })
    .toBuffer();

  return imageCompressed;
}
