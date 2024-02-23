import { createClient } from "redis";

export const redisClient = createClient({
  password: "nVzWhXbRorIuJ9KM1ULasmXs6nhJlZNK",
  socket: {
    host: "redis-11701.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 11701,
  },
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    redisClient.on("connect", () => {
      console.log("RREDIS CONNECT");
    });
  } catch (error) {
    process.exit();
  }
};

connectRedis();
redisClient.on("error", (err) => {
  throw new Error(err);
});
