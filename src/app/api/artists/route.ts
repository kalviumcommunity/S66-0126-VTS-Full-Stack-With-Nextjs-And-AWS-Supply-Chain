import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";

export async function GET() {
    try {
        const cacheKey = "artists:all";

        const cached = await getCache(cacheKey);
        if (cached) {
            return NextResponse.json(cached);
        }

        const artists = await prisma.artist.findMany({
            orderBy: { createdAt: "desc" },
        });

        const result = { artists };
        await setCache(cacheKey, result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Artists fetch error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
