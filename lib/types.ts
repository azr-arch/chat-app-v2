import { Chat, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
    };
    seen: { id: string; email: string | null }[];
};

export type FullChatType = Chat & {
    participants: User[];
    messages: FullMessageType[];
};

export interface MessagePayload {
    chatId: string;
    content: string;
    senderId: string;
    // replyTo: string;
}
