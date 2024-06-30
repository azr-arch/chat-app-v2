import { getCurrentUser } from "@/actions/db/get-current-user";
import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const currUser = await getCurrentUser();

        if (!currUser || !currUser.email) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const existingChat = await db.chat.findUnique({
            where: {
                id: params.chatId,
            },
            include: {
                participants: true,
            },
        });

        return NextResponse.json(existingChat);
    } catch (err) {
        console.log("[CHAT]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}
