"use client";

import { Chat, User } from "@prisma/client";
import { SidebarOpen } from "lucide-react";
import { SidebarHeader } from "./sidebar-header";
import { SidebarList } from "./sidebar-list";
import { FullChatType, FullMessageType } from "@/lib/types";
import { SidebarSearch } from "./sidebar-search";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface SidebarProps {
    currentUser: User;
    chats: FullChatType[];
}

export const Sidebar = ({ currentUser, chats }: SidebarProps) => {
    const [initialChats, setInitialChats] = useState<FullChatType[]>(chats);

    useEffect(() => {
        if (!currentUser.email) return;
        pusherClient.subscribe(currentUser.email);

        const updateChatHandler = ({ id, message }: { id: string; message: FullMessageType }) => {
            // Update the chats with corresponding id, to show new last message
            // Chat schema should be changed to using last Message field
            setInitialChats((prev) =>
                prev.map((chat) => {
                    if (chat.id !== id) return chat;

                    return { ...chat, messages: [...chat.messages, message] };
                })
            );
        };

        pusherClient.bind("chat:update", updateChatHandler);

        return () => {
            pusherClient.unbind("chat:update", updateChatHandler);
        };
    }, [currentUser.email]);

    return (
        <aside className="max-w-[480px] border-r border-lightGray md:min-w-[350px] md:w-full w-[80px] h-full bg-slateGray relative">
            <SidebarHeader data={currentUser} />
            <SidebarSearch />
            {/* <div className="block md:hidden absolute top-2 right-2">
                <SidebarOpen className="w-5 h-5" />
            </div> */}

            {/* <DesktopSidebar /> */}
            <SidebarList chats={chats} />

            {/* <p className="my-2 text-lg font-medium">Chats</p> */}
            {/* <ChatList data={chats} /> */}
        </aside>
    );
};

// TODO: fix this

// Sidebar.Skeleton = function SidebarSkeleton() {
//     return (
//         <div className="space-y-4">
//             <div className="flex items-center w-full ">
//                 <div className="w-14 h-14 rounded-full"></div>
//                 <div className="w-full flex flex-col items-start">
//                     <div className="w-full h-8"></div>

//                     <div className="w-full h-4"></div>
//                 </div>
//             </div>
//             <div className="flex items-center w-full ">
//                 <div className="w-14 h-14 rounded-full"></div>
//                 <div className="w-full flex flex-col items-start">
//                     <div className="w-full h-8"></div>

//                     <div className="w-full h-4"></div>
//                 </div>
//             </div>
//             <div className="flex items-center w-full ">
//                 <div className="w-14 h-14 rounded-full"></div>
//                 <div className="w-full flex flex-col items-start">
//                     <div className="w-full h-8"></div>

//                     <div className="w-full h-4"></div>
//                 </div>
//             </div>
//             <div className="flex items-center w-full ">
//                 <div className="w-14 h-14 rounded-full"></div>
//                 <div className="w-full flex flex-col items-start">
//                     <div className="w-full h-8"></div>

//                     <div className="w-full h-4"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };
