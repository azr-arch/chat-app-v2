import bcrypt from "bcrypt";
import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, password } = body;

        if (!email || !password || !name) {
            return new NextResponse("Missing info", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                name,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, "[REGISTRATION_ERROR]");
        return new NextResponse("Internal error", { status: 500 });
    }
}
