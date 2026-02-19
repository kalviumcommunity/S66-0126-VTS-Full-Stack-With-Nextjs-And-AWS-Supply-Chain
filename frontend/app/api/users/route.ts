import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

// In-memory user storage (resets on server restart)
const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
  },
];

let nextId = 4;

export async function GET() {
  console.log("[API] GET /api/users - Fetching users");
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: nextId++,
      name,
      email,
    };

    users.push(newUser);
    console.log("[API] POST /api/users - User added:", newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("[API] Error:", error);
    return NextResponse.json(
      { error: "Failed to add user" },
      { status: 500 }
    );
  }
}
