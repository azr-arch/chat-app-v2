"use client";

import { useProfileSidebar } from "@/hooks/use-profile-sidebar";
import { User } from "@prisma/client";

interface SidebarHeaderProps {
    data: User;
}

export const SidebarHeader = ({ data }: SidebarHeaderProps) => {
    const { onOpen, isOpen } = useProfileSidebar();
    console.log({ isOpen });
    return (
        <div className="w-full bg-beige px-6 h-16 flex items-center">
            {/* Profile */}
            <div role="button" onClick={onOpen} className="w-10 h-10 rounded-full bg-black mr-4" />

            {/* Todo add options */}
        </div>
    );
};
