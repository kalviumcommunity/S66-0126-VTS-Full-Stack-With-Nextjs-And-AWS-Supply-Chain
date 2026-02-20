import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis };

function getRedisClient(): Redis {
    const url = process.env.REDIS_URL || "redis://localhost:6379";
    return new Redis(url, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
    });
}

export const redis = globalForRedis.redis || getRedisClient();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

const CACHE_TTL = 300; // 5 minutes

export async function getCache<T>(key: string): Promise<T | null> {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

export async function setCache(key: string, data: unknown, ttl = CACHE_TTL): Promise<void> {
    try {
        await redis.set(key, JSON.stringify(data), "EX", ttl);
    } catch {
        // Fail silently — cache is optional
    }
}

export async function invalidateCache(key: string): Promise<void> {
    try {
        await redis.del(key);
    } catch {
        // Fail silently
    }
}

export default redis;
