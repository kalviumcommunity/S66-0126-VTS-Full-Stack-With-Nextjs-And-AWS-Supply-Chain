import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "artroot-default-secret-change-me";
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
    userId: string;
    email: string;
}

export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export function signToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

export function getTokenFromHeaders(headers: Headers): string | null {
    const auth = headers.get("Authorization");
    if (auth?.startsWith("Bearer ")) {
        return auth.slice(7);
    }
    // Also check cookie
    const cookies = headers.get("cookie") || "";
    const match = cookies.match(/token=([^;]+)/);
    return match ? match[1] : null;
}

export function getUserFromHeaders(headers: Headers): JWTPayload | null {
    const token = getTokenFromHeaders(headers);
    if (!token) return null;
    return verifyToken(token);
}
