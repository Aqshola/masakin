import { redisClient } from "@/libs/redis";

export const fetcher = (args: string) => fetch(args).then((res) => res.json());

export const getIpRequest = (req: Request) => {
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  return ip;
};

export const setLoadingState = (
  redis: typeof redisClient,
  key: string,
  data: {
    percent: number;
    state: string;
  }
) => {
  redis.set(key, JSON.stringify(data));
};
