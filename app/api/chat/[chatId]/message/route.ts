import { getCurrentUser } from "@/actions/db/get-current-user";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma-db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
    try {
        const sender = await getCurrentUser();

        if (!sender || !sender.email) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const { message, image } = await req.json();

        if (!message && !image) {
            return new NextResponse("Invalid fields", { status: 400 });
        }

        const newMessage = await db.message.create({
            include: {
                seen: true,
                sender: true,
            },
            data: {
                content: message,
                image,
                chat: {
                    connect: { id: params.chatId },
                },
                sender: {
                    connect: { id: sender.id },
                },
                seen: {
                    connect: {
                        id: sender.id,
                    },
                },
            },
        });

        const updatedChat = await db.chat.update({
            where: {
                id: params.chatId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
                // unreadCount: {
                //     increment: 1,
                // },
            },
            include: {
                participants: true,
                messages: {
                    include: {
                        seen: true,
                    },
                },
            },
        });

        await pusherServer.trigger(params.chatId, "messages:new", newMessage);

        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];

        updatedChat.participants.map((user) => {
            pusherServer.trigger(user.email!, "chat:update", {
                id: params.chatId,
                message: lastMessage,
            });
        });

        return NextResponse.json(newMessage);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
