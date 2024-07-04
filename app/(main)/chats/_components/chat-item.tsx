"use client";

import { Avatar } from "@/components/avatar";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { FullChatType } from "@/lib/types";
import { useOtherUser } from "@/hooks/use-other-user";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn, formatMessageTime } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface ChatItemProps {
    chat: FullChatType;
}

export const ChatItem = ({ chat }: ChatItemProps) => {
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

        // in seen arr there exists a person other than me
        return seenArr.filter((item) => item.email !== currentUserEmail).length !== 0;
    }, [currentUserEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (!lastMessage) return "Started a chat";
        if (lastMessage?.image) return "Sent an Image";

        if (lastMessage.content) return lastMessage.content;
    }, [lastMessage]);

    const isOwn = useMemo(() => {
        if (!lastMessage) return false;
        if (lastMessage?.sender?.email === currentUserEmail) {
            return true;
        }

        return false;
    }, [currentUserEmail, lastMessage]);

    const isActiveChat = useMemo(() => {
        if (!params || !params.chatId) return false;

        return params.chatId === chat.id;
    }, [chat.id, params]);

    return (
        <li
            key={otherUser?.id}
            className={cn(
                "px-4 md:px-6 h-20  bg-transparent  cursor-pointer duration-150 transition-colors relative flex items-center",
                isActiveChat ? "bg-[#1f2022]" : "hover:bg-[#1f2022]"
            )}
        >
            <Link href={`/chats/${chat.id}`} className="w-full">
                <div className="flex items-center gap-6 ">
                    <Avatar size="md" userInfo={otherUser} />

                    <div className="hidden md:flex flex-col items-start justify-center gap-1 ">
                        <p className="text-lightGray ">{otherUser?.name}</p>
                        <p
                            className={cn(
                                "text-xs ",
                                isSeen || lastMessageText === "Started a chat"
                                    ? " text-[#d2d3d3]"
                                    : " text-[#656668]"
                            )}
                        >
                            <span className="inline-flex items-center gap-2">
                                {isOwn &&
                                    (isSeen ? (
                                        <CheckCheck className="w-3 h-3" />
                                    ) : (
                                        <Check className="w-3 h-3" />
                                    ))}{" "}
                                {lastMessageText}
                            </span>
                        </p>

                        {chat && (
                            <time className="text-[#656668] font-bold absolute right-6 top-1/2 -translate-y-1/2 text-[10px]">
                                {formatMessageTime(lastMessage?.updatedAt || chat.createdAt)}
                            </time>
                        )}
                    </div>

                    {/* {!isOwn && !isSeen && lastMessageText !== "Started a chat" ? (
                        <span className="rounded-full p-1 absolute right-20 top-1/2 -translate-y-1/2  flex items-center justify-center text-[10px] 2xl:text-xs font-medium bg-[#fb734b] text-white"></span>
                    ) : null} */}
                </div>
            </Link>
        </li>
    );
};
