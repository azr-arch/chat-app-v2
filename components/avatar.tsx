import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
    size: "xs" | "sm" | "md" | "lg";
}

export const Avatar = ({ user, size }: AvatarProps) => {
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
                />
            </div>
        </div>
    );
};
