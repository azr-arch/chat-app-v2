"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { useOtherUser } from "@/hooks/use-other-user";
import { FullChatType } from "@/lib/types";
import { MoreHorizontal, MoreVertical, MoreVerticalIcon } from "lucide-react";

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

            <div className="ml-auto">
                <Button size={"icon"} variant={"outline"} className="bg-inherit hover:bg-white/20">
                    <MoreVertical className="w-5 h-5 text-white" />
                </Button>
            </div>
        </div>
    );
};
