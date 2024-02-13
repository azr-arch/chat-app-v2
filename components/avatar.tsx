import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
}

export const Avatar = ({ user }: AvatarProps) => {
    return (
        <div className="relative">
            <div className="relative rounded-full w-9 h-9 md:w-11 md:h-11 overflow-hidden">
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
