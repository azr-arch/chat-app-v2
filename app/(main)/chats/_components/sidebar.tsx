"use client";

import { Chat, User } from "@prisma/client";
import { SidebarOpen } from "lucide-react";
import { SidebarHeader } from "./sidebar-header";
import { SidebarList } from "./sidebar-list";
import { FullChatType } from "@/lib/types";

interface SidebarProps {
    otherUsers: User[];
    currentUser: User;
    chats: FullChatType[];
}

export const Sidebar = ({ otherUsers, currentUser, chats }: SidebarProps) => {
    return (
        <aside className="max-w-[350px] md:w-[40%] w-[80px] h-full bg-white text-black relative">
            <SidebarHeader data={currentUser} />
            {/* <div className="block md:hidden absolute top-2 right-2">
                <SidebarOpen className="w-5 h-5" />
            </div> */}

            {/* <DesktopSidebar /> */}
            <SidebarList data={otherUsers} chats={chats} />

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
