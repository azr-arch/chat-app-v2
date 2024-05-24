import { SEND_MESSAGE, TYPING_STATUS } from "@/lib/constants";
import { db } from "@/lib/prisma-db";
import { pusherServer } from "@/lib/pusher";
import { MessagePayload, TypingStatusPayload } from "@/lib/types";
import { Socket } from "socket.io";

// For sending messages
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

                await pusherServer.trigger(chatId, "messages:new", newMessage);
                const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
                updatedChat.participants.map((user) => {
                    pusherServer.trigger(user.email!, "chat:update", {
                        id: chatId,
                        // chatUnreadCount: chat?.unreadCount ? chat.unreadCount : 0,
                        message: lastMessage,
                    });
                });

                returnMessageToSender(newMessage);
            } catch (error) {
                console.log("error while sending message: ", error);
            }
        }
    );
};

// For handling typing status updates
export const handleTypingStatus = (socket: Socket) => {
    socket.on(TYPING_STATUS, async ({ chatId, isTyping, senderId }: TypingStatusPayload) => {
        try {
            await pusherServer.trigger(chatId, "typing::status", { isTyping, senderId });
        } catch (error) {
            console.log("error while sending typing updates: ", error);
        }
    });
};
