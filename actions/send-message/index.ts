"use server";

import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "../db/get-current-user";
import { SendMessage } from "./schema";
import { z } from "zod";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath } from "next/cache";

type InputType = z.infer<typeof SendMessage>;
type ReturnType = any;

// Todo use this instead of api calls

const handler = async (data: InputType): Promise<ReturnType> => {
    const { chatId, message } = data;
    let newMessage;
    try {
        const sender = await getCurrentUser();
        if (!sender || !sender.email) {
            return {
                error: "Unauthorized",
            };
        }

        let msg;

        const chat = await db.chat.findUnique({
            where: {
                id: chatId,
            },
        });

        newMessage = await db.message.create({
            include: {
                seen: true,
                sender: true,
            },
            data: {
                content: message,
                chat: {
                    connect: { id: chatId },
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
                id: chatId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
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

        await pusherServer.trigger(chatId, "messages:new", newMessage);
        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
        updatedChat.participants.map((user) => {
            pusherServer.trigger(user.email!, "chat:update", {
                id: chatId,
                message: [lastMessage],
            });
        });
    } catch (error) {
        return {
            error: "Failed to create.",
        };
    }

    revalidatePath(`/chat/${chatId}`);
    return { data: newMessage };
};

// Complete actions usign
// export const createCard = createSafeAction(CreateCard, handler);
