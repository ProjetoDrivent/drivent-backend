import { createClient } from "redis";
import { promisify } from "util";

export const DEFAULT_EXP = 30;

const redis = createClient({
    url: process.env.REDIS_URL
});

export const getAsync = promisify(redis.get).bind(redis);
export const setAsync = promisify(redis.set).bind(redis);

(async () => {
    console.log("Connecting redis...");
    await redis.connect();
})();

export default redis;