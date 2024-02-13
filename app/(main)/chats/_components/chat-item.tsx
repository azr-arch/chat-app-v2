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
            const data = await axios.post(`/api/chat/${chatId}`, {
                userId: user?.id,
                chatId: chat?.id,
            });

            router.push(`/chats/${data.data.id}`);
        } catch (error) {
            console.log(error);
        }
    }, [user?.id, chat?.id, router]);

    return (
        <li
            key={user?.id}
            className="px-4 md:px-6 py-2 bg-pink-300 cursor-pointer hover:bg-opacity-50 transition relative"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <Avatar user={user} />

                <div className="hidden md:flex flex-col items-start ">
                    <p className="text-black">{user?.name}</p>
                    <p className="text-neutral-700 text-sm">previous message text</p>
                    {chat && (
                        <time className="text-neutral-600 font-semibold absolute right-4 top-2 text-[10px]">
                            {format(new Date(chat.createdAt), "p")}
                        </time>
                    )}
                </div>
            </div>
        </li>
    );
};
