"use client";

import { Button } from "@/components/ui/button";
import { useAddFriendModal } from "@/hooks/use-add-friend-modal";
import { useProfileSidebar } from "@/hooks/use-profile-sidebar";
import { User } from "@prisma/client";
import { MessageSquarePlus, Plus, Users } from "lucide-react";
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
                <Image
                    src={data?.image || "/placeholder.png"}
                    className="object-cover"
                    fill
                    alt={`${data.name}'s avatar`}
                />
            </div>

            {/* Todo add options */}

            <div className="ml-auto space-x-2">
                {/* Start a private conversation Button */}
                <Button
                    onClick={() => openAddFriend("private")}
                    title="Add Friend"
                    className="  bg-light-black "
                    size={"icon"}
                    variant={"primary"}
                >
                    <Plus className="w-5 h-5 " />
                </Button>

                {/* Start a group conversation Button */}
                <Button
                    onClick={() => openAddFriend("group")}
                    title="Create a group"
                    className="  bg-light-black  "
                    size={"icon"}
                    variant={"primary"}
                >
                    <Users className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};
