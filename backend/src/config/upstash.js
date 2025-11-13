import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Initialize Redis connection
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a rate limiter that allows 10 requests every 20 seconds
const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "120 s"),
    analytics: true, // optional: for Upstash dashboard insights
});

export default rateLimit;
