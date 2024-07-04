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
        <div className="px-6 w-full h-16 flex items-center relative chat-header-effect">
            <div className="flex items-center gap-5">
                <Avatar userInfo={receiver} size="xs" />

                <div className="flex flex-col items-start ">
                    <p className="text-lightGray font-medium ">{receiver.name}</p>
                    {/* TODO: implement this */}
                    {/* <p className="text-xs text-neutral-700">active 3min ago.</p> */}
                </div>
            </div>
        </div>
    );
};
