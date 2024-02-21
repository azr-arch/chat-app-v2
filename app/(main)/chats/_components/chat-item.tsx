"use client";

import { Avatar } from "@/components/avatar";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { useCallback, useMemo } from "react";
import { FullChatType } from "@/lib/types";
import { useOtherUser } from "@/hooks/use-other-user";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn, formatMessageTime } from "@/lib/utils";

interface ChatItemProps {
    chat: FullChatType;
}

// Fix this

export const ChatItem = ({ chat }: ChatItemProps) => {
    const router = useRouter();
    const params = useParams();
    const otherUser = useOtherUser(chat);
    const session = useSession();

    const currentUserEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

    const lastMessage = useMemo(() => {
        if (chat.messages.length < 0) return null;
        return chat.messages[chat.messages.length - 1];
    }, [chat.messages]);

    const isSeen = useMemo(() => {
        if (!lastMessage) return false;

        const seenArr = lastMessage.seen || [];
        if (!currentUserEmail) return false;

        return seenArr.filter((item) => item.email === currentUserEmail).length !== 0;
    }, [currentUserEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (!lastMessage) return "Started a chat";
        if (lastMessage?.image) return "Sent an Image";

        if (lastMessage.content) return lastMessage.content;
    }, [lastMessage]);

    const isActiveChat = useMemo(() => {
        if (!params || !params.chatId) return false;

        return params.chatId === chat.id;
    }, [chat.id, params]);

    // Todo can be used for new chats
    // Creating new chat route functionality is missing
    const onClick = useCallback(async () => {
        try {
            const data = await axios.get(`/api/chat/${chat.id}`);

            router.push(`/chats/${data.data.id}`);
        } catch (error) {
            console.log(error);
        }
    }, [chat.id, router]);

    return (
        <li
            key={otherUser?.id}
            className={cn(
                "px-4 md:px-6 h-20  bg-transparent border-b cursor-pointer duration-150 transition-colors relative flex items-center",
                isActiveChat ? "bg-beige/50" : "hover:bg-beige/50"
            )}
        >
            <Link href={`/chats/${chat.id}`} className="w-full">
                <div className="flex items-center gap-3 ">
                    <Avatar size="lg" user={otherUser} />

                    <div className="hidden md:flex flex-col items-start ">
                        <p className="text-lightGray font-normal">{otherUser?.name}</p>
                        <p
                            className={cn(
                                "text-xs text-gray-100",
                                isSeen || lastMessageText === "Started a chat"
                                    ? "font-normal"
                                    : "font-medium"
                            )}
                        >
                            {lastMessageText}
                        </p>
                        {chat && (
                            <time className="text-neutral-800 font-bold absolute right-4 top-2 text-[10px]">
                                {formatMessageTime(lastMessage?.updatedAt || chat.createdAt)}
                            </time>
                        )}
                    </div>
                </div>
            </Link>
        </li>
    );
};
