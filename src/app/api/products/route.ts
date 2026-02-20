import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const tag = searchParams.get("tag");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const skip = (page - 1) * limit;

        const cacheKey = `products:${tag || "all"}:${page}:${limit}`;

        // Try cache first
        const cached = await getCache(cacheKey);
        if (cached) {
            return NextResponse.json(cached);
        }

        const where = tag && tag !== "All" ? { tag } : {};

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.product.count({ where }),
        ]);

        const result = {
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };

        await setCache(cacheKey, result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Products fetch error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
