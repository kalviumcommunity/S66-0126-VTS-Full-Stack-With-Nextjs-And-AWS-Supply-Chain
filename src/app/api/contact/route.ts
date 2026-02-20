import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Invalid email"),
    subject: z.string().min(1, "Subject is required").max(200),
    message: z.string().min(1, "Message is required").max(2000),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            );
        }

        const msg = await prisma.contactMessage.create({
            data: parsed.data,
        });

        return NextResponse.json(
            { message: "Message sent successfully", id: msg.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
