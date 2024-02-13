import { SEND_MESSAGE } from "@/lib/constants";
import { db } from "@/lib/prisma-db";
import { pusherServer } from "@/lib/pusher";
import { MessagePayload } from "@/lib/types";
import { Socket } from "socket.io";

export const handleSendMessage = (socket: Socket) => {
    socket.on(
        SEND_MESSAGE,
        async ({ senderId, content, chatId }: MessagePayload, returnMessageToSender) => {
            let newMessage;

            try {
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
                        content: content,
                        chat: {
                            connect: { id: chatId },
                        },
                        sender: {
                            connect: { id: senderId },
                        },
                        seen: {
                            connect: {
                                id: senderId,
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

                returnMessageToSender(newMessage);
            } catch (error) {
                console.log("error: ", error);
            }
        }
    );
};
