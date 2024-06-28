"use client";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import { OnlineIndicator } from "./online-indicator";
import { useMemo } from "react";
import { useOnlineList } from "@/hooks/use-online-list";

interface AvatarProps {
    user?: User;
    size: "xs" | "sm" | "md" | "lg";
}

export const Avatar = ({ user, size }: AvatarProps) => {
    const { onlineList } = useOnlineList();

    const isOnline = useMemo(() => {
        if (!user) return false;

        // Assuming onlineList is an array of objects with id and name properties
        const userExists = onlineList.some((user) => user.id === user.id);

        return userExists;
    }, [onlineList, user]);

    return (
        <div className="relative">
            <div
                className={cn(
                    `relative rounded-full overflow-hidden`,
                    size === "xs"
                        ? "w-7 h-7"
                        : size === "sm"
                        ? "w-9 h-9"
                        : size === "md"
                        ? "w-10 h-10"
                        : "w-11 h-11"
                )}
            >
                <Image
                    src={user?.image || "/placeholder.png"}
                    fill
                    alt="user-profile"
                    className="object-cover"
                    sizes="40"
                />
            </div>
            {/* Online indicator */}
            {isOnline ? <OnlineIndicator /> : null}
        </div>
    );
};
