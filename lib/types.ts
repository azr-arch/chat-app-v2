import { Chat, Message, User } from "@prisma/client";
import { Socket } from "socket.io-client";

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
    // status: "SENT" | "PENDING";
}

export interface TypingStatusPayload {
    chatId: string;
    senderId: string;
    isTyping: boolean;
}

export type SelectOptions = {
    name: string | null;
    image: string | null;
    email: string | null; // For temp, we can use id instead
};

export interface UserPayload {
    id: string;
    name: string;
    socket?: Socket;
}
