import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromHeaders } from "@/lib/auth";
import { z } from "zod";

// GET — fetch user's cart
export async function GET(req: NextRequest) {
    try {
        const user = getUserFromHeaders(req.headers);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const items = await prisma.cartItem.findMany({
            where: { userId: user.userId },
            include: {
                product: {
                    select: { id: true, title: true, artist: true, price: true, image: true, tag: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Cart fetch error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST — add item to cart
const addSchema = z.object({
    productId: z.string().min(1),
});

export async function POST(req: NextRequest) {
    try {
        const user = getUserFromHeaders(req.headers);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = addSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const { productId } = parsed.data;

        // Check product exists
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Upsert — increment quantity if already in cart
        const item = await prisma.cartItem.upsert({
            where: {
                userId_productId: { userId: user.userId, productId },
            },
            update: { quantity: { increment: 1 } },
            create: { userId: user.userId, productId, quantity: 1 },
            include: {
                product: {
                    select: { id: true, title: true, artist: true, price: true, image: true, tag: true },
                },
            },
        });

        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        console.error("Cart add error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH — update quantity
const updateSchema = z.object({
    cartItemId: z.string().min(1),
    quantity: z.number().int().min(0),
});

export async function PATCH(req: NextRequest) {
    try {
        const user = getUserFromHeaders(req.headers);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = updateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const { cartItemId, quantity } = parsed.data;

        // Verify ownership
        const existing = await prisma.cartItem.findFirst({
            where: { id: cartItemId, userId: user.userId },
        });
        if (!existing) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        if (quantity === 0) {
            await prisma.cartItem.delete({ where: { id: cartItemId } });
            return NextResponse.json({ message: "Item removed" });
        }

        const updated = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
            include: {
                product: {
                    select: { id: true, title: true, artist: true, price: true, image: true, tag: true },
                },
            },
        });

        return NextResponse.json({ item: updated });
    } catch (error) {
        console.error("Cart update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE — remove item from cart
export async function DELETE(req: NextRequest) {
    try {
        const user = getUserFromHeaders(req.headers);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Missing cart item ID" }, { status: 400 });
        }

        // Verify ownership
        const existing = await prisma.cartItem.findFirst({
            where: { id, userId: user.userId },
        });
        if (!existing) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        await prisma.cartItem.delete({ where: { id } });
        return NextResponse.json({ message: "Item removed" });
    } catch (error) {
        console.error("Cart delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
