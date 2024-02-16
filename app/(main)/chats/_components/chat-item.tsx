"use client";

import { Avatar } from "@/components/avatar";
import { Chat, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { useCallback } from "react";
import { FullChatType } from "@/lib/types";
import { useOtherUser } from "@/hooks/use-other-user";

interface ChatItemProps {
    chat: FullChatType;
}

// Fix this

export const ChatItem = ({ chat }: ChatItemProps) => {
    const router = useRouter();
    const otherUser = useOtherUser(chat);

    const onClick = useCallback(async () => {
        try {
            const data = await axios.get(`/api/chat/${chat.id}`);

            router.push(`/chats/${data.data.id}`);
        } catch (error) {
            console.log(error);
        }
    }, [chat.id, router]);

    // Creating new chat route functionality is missing

    return (
        <li
            key={otherUser?.id}
            className="px-4 md:px-6 h-20  bg-transparent border-b cursor-pointer hover:bg-beige duration-150 transition-colors relative flex items-center "
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <Avatar size="lg" user={otherUser} />

                <div className="hidden md:flex flex-col items-start ">
                    <p className="text-black font-medium">{otherUser?.name}</p>
                    <p className="text-neutral-800 text-sm">previous message text</p>
                    {chat && (
                        <time className="text-neutral-800 font-semibold absolute right-4 top-2 text-[10px]">
                            {format(new Date(chat.createdAt), "p")}
                        </time>
                    )}
                </div>
            </div>
        </li>
    );
};
