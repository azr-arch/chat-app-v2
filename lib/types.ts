import { Chat, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: User;
    seen: User[];
};

export type FullChatType = Chat & {
    participants: User[];
    // messages?: FullMessageType[];
};

export interface MessagePayload {
    chatId: string;
    content: string;
    senderId: string;
    // replyTo: string;
}
