import { FullMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

    const seenAgo = (data.seen || []).filter((user) => user.id !== data.sender.id);

    return (
        <div
            className={cn(
                `flex w-fit flex-col items-start max-w-[80%] gap-1 relative`,
                isReceiver ? "self-start items-start " : "self-end items-end"
            )}
        >
            {data.content && (
                <p
                    className={cn(
                        `p-2 rounded-md text-sm font-medium`,
                        isReceiver ? "text-black bg-beige" : "text-white bg-darkGray"
                    )}
                    data-receiver={isReceiver ? "other" : "me"}
                >
                    {data.content}
                </p>
            )}

            {data.image && (
                <Link href={data.image} target="_blank">
                    <Image
                        src={data.image}
                        className={cn(
                            "w-[200px] h-[200px] object-contain object-center rounded-sm  relative",
                            isReceiver ? " bg-beige" : " bg-darkGray"
                        )}
                        width={200}
                        height={200}
                        alt={"image"}
                    />
                </Link>
            )}

            <div className="flex items-center space-x-2 mt-[1px] text-[10px]">
                <time className="text-neutral-800 font-semibold">
                    {format(new Date(data.createdAt), "p")}
                </time>
                {isLast &&
                    !isReceiver &&
                    (seenAgo.length > 0 ? (
                        <CheckCheck className="w-3 h-3" />
                    ) : (
                        <Check className="w-3 h-3" />
                    ))}
            </div>
        </div>
    );
};
