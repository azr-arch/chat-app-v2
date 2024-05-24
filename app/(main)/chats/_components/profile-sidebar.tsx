"use client";

import { User } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import { signOut } from "next-auth/react";

interface ProfileSidebarProps {
    data: User;
}

export const ProfileSidebar = ({ data }: ProfileSidebarProps) => {
    return (
        <aside className="w-full h-full flex flex-col">
            <div className="h-[66px] ">
                <MoveLeft className="w-4 h-4 mr-4" />
                <p className="font-bold text-lg">Profile</p>
            </div>

            <div>
                <div className="w-[100px] h-[100px] rounded-full bg-black "></div>

                <p>{data.name}</p>
                <span className="text-sm font-medium text-accent-3">{data.email}</span>
            </div>

            <button onClick={() => signOut({ redirect: true })}>Logout</button>
        </aside>
    );
};
