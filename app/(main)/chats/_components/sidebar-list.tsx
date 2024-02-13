import { Chat, User } from "@prisma/client";
import Image from "next/image";
import { ChatItem } from "./chat-item";
import { FullChatType } from "@/lib/types";

interface SidebarListProps {
    data: User[];
    chats: FullChatType[];
}

export const SidebarList = ({ data, chats }: SidebarListProps) => {
    return (
        <ul className="w-full overflow-y-auto space-y-4">
            <li className="py-4 px-2">Chats: </li>
            {chats.map((chat) => (
                <ChatItem chat={chat} key={chat.id} />
            ))}
        </ul>
    );
};
