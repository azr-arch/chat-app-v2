import { Sidebar } from "./_components/sidebar";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";
import { SocketProvider } from "@/context/socket";
import { SocketIndicator } from "@/components/socket-indicator";
import { getChats } from "@/actions/get-chat/get-chats";
import { AddUserModal } from "@/components/modals/add-user.modal";
import { currentUser } from "@/lib/auth";

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return redirect("/");
    }

    const availableChats = await getChats();

    return (
        <SocketProvider>
            <div className="w-full h-full flex relative">
                <AddUserModal />
                {/* <SocketIndicator /> */}
                <Sidebar currentUser={currUser} chats={availableChats} />
                {children}
            </div>
        </SocketProvider>
    );
};

export default ChatsLayout;
