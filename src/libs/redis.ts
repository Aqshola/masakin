import { createClient } from "redis";

export const redisClient = createClient({
  password: process.env.REDIS_PASSOWRD,
  socket: {
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_PORT),
  },
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    redisClient.on("connect", () => {
      console.log("RREDIS CONNECT");
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

connectRedis();
redisClient.on("error", (err) => {
  throw new Error(err);
});
