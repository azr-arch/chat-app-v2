"use client";

import { Button } from "@/components/ui/button";
import { useAddFriendModal } from "@/hooks/use-add-friend-modal";
import { useProfileSidebar } from "@/hooks/use-profile-sidebar";
import { User } from "@prisma/client";
import { MessageSquarePlus } from "lucide-react";
import Image from "next/image";

interface SidebarHeaderProps {
    data: User;
}

export const SidebarHeader = ({ data }: SidebarHeaderProps) => {
    const { onOpen, isOpen } = useProfileSidebar();
    const { onOpen: openAddFriend } = useAddFriendModal();

    return (
        <div className="w-full bg-transparent px-6 h-16 flex items-center">
            {/* Profile */}
            <div
                role="button"
                onClick={onOpen}
                className="w-10 h-10 relative rounded-full bg-black mr-4 outline outline-light-black overflow-hidden"
            >
                <Image src={data?.image || "/placeholder.png"} fill alt={`${data.name}'s avatar`} />
            </div>

            {/* Todo add options */}

            <Button
                onClick={openAddFriend}
                title="Add Friend"
                className=" ml-auto "
                size={"sm"}
                variant={"secondary"}
            >
                <MessageSquarePlus className="w-5 h-5 " />
            </Button>
        </div>
    );
};
