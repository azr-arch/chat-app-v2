"use client";

import { Avatar } from "@/components/avatar";
import { useOtherUser } from "@/hooks/use-other-user";
import { FullChatType } from "@/lib/types";

interface ChatHeaderProps {
    data: FullChatType;
}

export const ChatHeader = ({ data }: ChatHeaderProps) => {
    const receiver = useOtherUser(data);

    return (
        <div className="px-4 w-full h-[72px] flex items-center bg-blue-500 relative">
            <div className="flex items-center gap-3">
                <Avatar user={receiver} />

                <div className="flex flex-col items-start p-1 ">
                    <p className="text-black">{receiver.name}</p>
                    <p className="text-xs text-neutral-700">active 3min ago.</p>
                </div>
            </div>
        </div>
    );
};
