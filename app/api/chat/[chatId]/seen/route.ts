import { getCurrentUser } from "@/actions/get-current-user";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma-db";
import { pusherServer } from "@/lib/pusher";
import { last } from "lodash";
import { send } from "process";

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.email) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const chat = await db.chat.findUnique({
            where: {
                id: params.chatId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                participants: true,
            },
        });

        if (!chat) {
            return new NextResponse("Invalid ChatID", { status: 401 });
        }

        const lastMessage = chat.messages[chat.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(chat);
        }

        const updatedMessage = await db.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });

        await pusherServer.trigger(currentUser.email, "chat:update", {
            id: params.chatId,
            messages: [updatedMessage],
        });

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(chat);
        }

        await pusherServer.trigger(params.chatId, "message:update", updatedMessage);

        return new NextResponse("Done");
    } catch (error: any) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
