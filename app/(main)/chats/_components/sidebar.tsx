"use client";

import { User } from "@prisma/client";
import { SidebarHeader } from "./sidebar-header";
import { SidebarList } from "./sidebar-list";
import { FullChatType, FullMessageType } from "@/lib/types";
import { SidebarSearch } from "./sidebar-search";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

import { useProfileSidebar } from "@/hooks/use-profile-sidebar";
import { ProfileSidebar } from "./profile-sidebar";
import { X } from "lucide-react";
import { toast } from "sonner";

interface SidebarProps {
    currentUser: User;
    chats: FullChatType[];
}

export const Sidebar = ({ currentUser, chats }: SidebarProps) => {
    const [initialChats, setInitialChats] = useState<FullChatType[]>(chats);
    const { isOpen, onClose } = useProfileSidebar();

    const userJoinedCaller = async () => {
        try {
            await fetch("/api/user_joined");
        } catch (error) {
            toast.error(" Due to a network issue, your active status won’t be visible.");
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        userJoinedCaller()
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (!currentUser.email) return;
        pusherClient.subscribe(currentUser.email);
        pusherClient.subscribe("userJoinedChannel");

        const updateChatHandler = (data: {
            id: string;
            message: FullMessageType;
            // chatUnreadCount: number;
        }) => {
            if (!data.message) return;
            setInitialChats((prev) =>
                prev.map((prevChat) => {
                    if (prevChat.id === data.id) {
                        // if (!find(prevChat.messages, { id: data.message.id })) {
                        return {
                            ...prevChat,
                            messages: [...prevChat.messages, data.message],
                        };
                        // }
                    }
                    return prevChat;
                })
            );
        };

        // pusherClient.bind("chat:update", updateChatHandler);
        // // what should be the bind name of userjoined
        // pusherClient.bind("userJoined", )

        return () => {
            pusherClient.unbind("chat:update", updateChatHandler);
        };
    }, [currentUser.email]);

    return (
        <aside className="max-w-[480px] border-r  border-[#1e1f21] md:min-w-[350px] md:w-full w-[80px] h-full bg-main relative">
            <SidebarHeader data={currentUser} />
            <SidebarSearch />
            {/* <div className="block md:hidden absolute top-2 right-2">
                <SidebarOpen className="w-5 h-5" />
            </div> */}

            {/* <DesktopSidebar /> */}
            <SidebarList chats={initialChats} />

            {/* <p className="my-2 text-lg font-medium">Chats</p> */}
            {/* <ChatList data={chats} /> */}

            {/* Profile Nav */}
            <div
                data-profile-drawer-state={isOpen}
                className="absolute top-0 left-0 z-50 w-full h-full bg-black data-[profile-drawer-state=true]:opacity-100  data-[profile-drawer-state=true]:translate-x-0 data-[profile-drawer-state=false]:opacity-0 data-[profile-drawer-state=false]:-translate-x-full data-[profile-drawer-state=false]:-z-10 transition-all duration-200 ease-in-out"
            >
                {/* Close Button  */}
                <button
                    className="absolute top-4 right-4 p-2 active:outline active:outline-light-black rounded-md text-accent-2 bg-transparent transition hover:text-white"
                    onClick={onClose}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Profile Content */}
                <ProfileSidebar data={currentUser} />
            </div>
        </aside>
    );
};

// TODO: fix this
// Add Skeleton
