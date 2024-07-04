import { Sidebar } from "./_components/sidebar";
import { AddChatModal } from "@/components/modals/add-chat-modal";

import { getChats } from "@/actions/db/get-chat/get-chats";
import { getAllFriends } from "@/actions/db/get-all-friends";
import { getCurrentUser } from "@/actions/db/get-current-user";

import { SocketProvider } from "@/context/socket";
import { redirect } from "next/navigation";

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return redirect("/");
    }

    const availableChats = await getChats();
    const friends = await getAllFriends();

    return (
        <SocketProvider>
            <div className="w-full h-full flex relative">
                <AddChatModal friends={friends} />
                <Sidebar currentUser={currUser} chats={availableChats} />
                {children}
            </div>
        </SocketProvider>
    );
};

export default ChatsLayout;
