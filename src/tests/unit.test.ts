import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";
import { hashPassword, verifyPassword, signToken, verifyToken } from "@/lib/auth";

describe("cn utility", () => {
    it("should merge class names", () => {
        expect(cn("px-2", "py-1")).toBe("px-2 py-1");
    });

    it("should handle conditional classes", () => {
        expect(cn("base", false && "hidden", "extra")).toBe("base extra");
    });
});

describe("Auth utilities", () => {
    it("should hash and verify passwords", () => {
        const hash = hashPassword("testpassword123");
        expect(hash).not.toBe("testpassword123");
        expect(verifyPassword("testpassword123", hash)).toBe(true);
        expect(verifyPassword("wrongpassword", hash)).toBe(false);
    });

    it("should sign and verify JWT tokens", () => {
        const payload = { userId: "test-id", email: "test@example.com" };
        const token = signToken(payload);
        expect(token).toBeTruthy();

        const decoded = verifyToken(token);
        expect(decoded).toBeTruthy();
        expect(decoded?.userId).toBe("test-id");
        expect(decoded?.email).toBe("test@example.com");
    });

    it("should return null for invalid tokens", () => {
        const decoded = verifyToken("invalid-token");
        expect(decoded).toBeNull();
    });
});
