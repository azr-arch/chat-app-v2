import { FullMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { memo, useMemo } from "react";

interface MessageItemProps {
    data: FullMessageType;
    otherUser: User;
    isLast: boolean;
}

export const MessageItem = ({ data, otherUser, isLast }: MessageItemProps) => {
    const isReceiver = useMemo(() => {
        return data.senderId === otherUser.id;
    }, [data.senderId, otherUser.id]);

    const seenAgo = (data.seen || [])
        .filter((user) => user.id !== data.sender.id)
        .map((user) => `${formatDistanceToNow(new Date(data.updatedAt))}`)[0];

    return (
        <div
            className={cn(
                `flex w-fit flex-col items-start max-w-[80%] gap-1 relative`,
                isReceiver ? "self-start items-start " : "self-end items-end"
            )}
        >
            <span
                className={cn(
                    `p-2 rounded-md`,
                    isReceiver ? "text-white bg-black" : "text-black bg-white"
                )}
            >
                {data.content}
            </span>

            <div className="flex items-center space-x-2 mt-[1px] text-[10px]">
                <time className="text-neutral-600 font-semibold">
                    {format(new Date(data.createdAt), "p")}
                </time>
                {isLast && !isReceiver && seenAgo && (
                    <span className=" text-neutral-700 font-medium">seen {seenAgo} ago</span>
                )}
            </div>
        </div>
    );
};
