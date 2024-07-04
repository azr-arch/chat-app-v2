"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface ProfileSidebarProps {
    data: User;
}

export const ProfileSidebar = ({ data }: ProfileSidebarProps) => {
    return (
        <aside className="w-full h-full bg-light-black flex items-center justify-start pt-10 space-y-6  flex-col">
            <div className="">
                {/* <MoveLeft className="w-4 h-4 mr-4" /> */}
                <p className="font-bold text-lg text-white">Profile</p>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="w-[100px] h-[100px] rounded-full bg-black outline-light-black outline relative overflow-hidden ">
                    <Image
                        src={data?.image || "/placeholder.png"}
                        fill
                        alt={`${data.name}'s avatar`}
                    />
                </div>

                <div className="mt-4 text-center">
                    <p className="text-white">{data.name}</p>
                    <span className="text-sm font-medium text-accent-2">{data.email}</span>
                </div>
            </div>

            <Button
                variant={"outline"}
                className="flex items-center gap-x-1"
                onClick={() => signOut({ redirect: true })}
            >
                <LogOut className="w-4 h-4" />
                Logout
            </Button>
        </aside>
    );
};
