import { DateBadge } from "@/components/date-badge";
import { FullMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

interface MessageItemProps {
    data: FullMessageType & { isNewDay?: boolean };
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
                isReceiver ? "self-start items-start pl-8" : "self-end items-end"
            )}
        >
            {data.content && (
                <p
                    className={cn(
                        `py-2 px-4 rounded-md text-sm  text-white`,
                        isReceiver ? " bg-light-black" : " bg-light-blue"
                    )}
                    data-receiver={isReceiver ? "other" : "me"}
                >
                    {data.content}
                </p>
            )}

            {data.image && (
                <Link
                    href={data.image}
                    target="_blank"
                    className={`rounded-xl ${isReceiver ? "rounded-tl-sm" : "rounded-tr-sm"}`}
                >
                    <Image
                        src={data.image}
                        className={cn(
                            "w-[200px] h-[200px] object-contain object-center  relative rounded-xl",
                            isReceiver
                                ? " bg-light-black rounded-tl-sm"
                                : " bg-light-blue rounded-tr-sm"
                        )}
                        width={200}
                        height={200}
                        alt={"image"}
                    />
                </Link>
            )}

            <div className="flex items-center space-x-2 mt-[1px] text-[10px]">
                <time className="text-accent-3 font-semibold">
                    {format(new Date(data.createdAt), "p")}
                </time>

                {isLast &&
                    !isReceiver &&
                    (seenAgo.length > 0 ? (
                        <CheckCheck className="w-3 h-3  text-white" />
                    ) : (
                        <Check className="w-3 h-3 text-white" />
                    ))}
            </div>
        </div>
    );
};
