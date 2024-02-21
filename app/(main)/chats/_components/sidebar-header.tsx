"use client";

import { Button } from "@/components/ui/button";
import { useAddFriendModal } from "@/hooks/use-add-friend-modal";
import { useProfileSidebar } from "@/hooks/use-profile-sidebar";
import { User } from "@prisma/client";
import { MessageSquarePlus } from "lucide-react";

interface SidebarHeaderProps {
    data: User;
}

export const SidebarHeader = ({ data }: SidebarHeaderProps) => {
    const { onOpen, isOpen } = useProfileSidebar();
    const { onOpen: openAddFriend } = useAddFriendModal();

    return (
        <div className="w-full bg-beige px-6 h-16 flex items-center">
            {/* Profile */}
            <div role="button" onClick={onOpen} className="w-10 h-10 rounded-full bg-black mr-4" />

            {/* Todo add options */}

            <Button
                onClick={openAddFriend}
                className=" ml-auto rounded-full"
                size={"sm"}
                variant={"outline"}
            >
                <MessageSquarePlus className="w-5 h-5 " />
            </Button>
        </div>
    );
};
