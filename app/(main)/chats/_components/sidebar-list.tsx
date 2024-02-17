import { Chat, User } from "@prisma/client";
import Image from "next/image";
import { ChatItem } from "./chat-item";
import { FullChatType, FullMessageType } from "@/lib/types";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";

interface SidebarListProps {
    chats: FullChatType[];
}

export const SidebarList = ({ chats }: SidebarListProps) => {
    return (
        <ul className="w-full text-black overflow-y-auto ">
            {chats.map((chat) => (
                <ChatItem chat={chat} key={chat.id} />
            ))}
        </ul>
    );
};
