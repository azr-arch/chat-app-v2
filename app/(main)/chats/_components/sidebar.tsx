"use client";

import { User } from "@prisma/client";
import { SidebarHeader } from "./sidebar-header";
import { SidebarList } from "./sidebar-list";
import { FullChatType, FullMessageType } from "@/lib/types";
import { SidebarSearch } from "./sidebar-search";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

import { useProfileSidebar } from "@/hooks/use-profile-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ProfileSidebar } from "./profile-sidebar";

interface SidebarProps {
    currentUser: User;
    chats: FullChatType[];
}

export const Sidebar = ({ currentUser, chats }: SidebarProps) => {
    const [initialChats, setInitialChats] = useState<FullChatType[]>(chats);
    const { isOpen, onClose } = useProfileSidebar();

    useEffect(() => {
        if (!currentUser.email) return;
        pusherClient.subscribe(currentUser.email);

        const updateChatHandler = (data: { id: string; message: FullMessageType }) => {
            if (!data.message) return;
            setInitialChats((prev) =>
                prev.map((chat) => {
                    if (chat.id === data.id) {
                        if (!find(chat.messages, { id: data.message.id })) {
                            return { ...chat, messages: [...chat.messages, data.message] };
                        }
                    }
                    return chat;
                })
            );
        };

        pusherClient.bind("chat:update", updateChatHandler);

        return () => {
            pusherClient.unbind("chat:update", updateChatHandler);
        };
    }, [currentUser.email]);

    return (
        <aside className="max-w-[480px] border-r  border-lightGray md:min-w-[350px] md:w-full w-[80px] h-full bg-slateGray relative">
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

            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-2 pt-10  w-full absolute top-0 left-0">
                    <ProfileSidebar data={currentUser} />
                </SheetContent>
            </Sheet>
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
