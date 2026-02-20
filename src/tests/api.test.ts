import { describe, it, expect } from "vitest";

describe("API - Auth", () => {
    it("should reject registration with missing fields", async () => {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "" }),
        });
        expect(res.status).toBe(400);
    });

    it("should reject login with invalid credentials", async () => {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "nonexistent@test.com", password: "wrong" }),
        });
        expect(res.status).toBe(401);
    });
});

describe("API - Products", () => {
    it("should return products list", async () => {
        const res = await fetch("http://localhost:3000/api/products");
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data).toHaveProperty("products");
    });
});

describe("API - Artists", () => {
    it("should return artists list", async () => {
        const res = await fetch("http://localhost:3000/api/artists");
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data).toHaveProperty("artists");
    });
});

describe("API - Cart", () => {
    it("should reject unauthenticated cart access", async () => {
        const res = await fetch("http://localhost:3000/api/cart");
        expect(res.status).toBe(401);
    });
});

describe("API - Contact", () => {
    it("should reject contact submission with missing fields", async () => {
        const res = await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test" }),
        });
        expect(res.status).toBe(400);
    });
});
