import { db } from "@/lib/prisma-db";
import { Logout } from "@/components/logout";
import { Sidebar } from "./_components/sidebar";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";
import { SocketProvider } from "@/context/socket";
import { SocketIndicator } from "@/components/socket-indicator";

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {
    const currUser = await getCurrentUser();

    if (!currUser) {
        redirect("/");
    }

    const availableChatsFn = async () =>
        await db.chat.findMany({
            where: {
                participants: {
                    some: {
                        email: currUser.email,
                    },
                },
            },
            include: {
                participants: true,
            },
        });

    const [availableChats] = await Promise.all([availableChatsFn()]);

    return (
        <SocketProvider>
            <div
                // style={{ maxHeight: "calc(100vh - 64px)" }}
                // className="w-full h-full self-stretch mx-auto max-w-screen-2xl px-8 py-4 flex gap-x-4 items-stretch relative"
                className="w-full h-full flex relative"
            >
                <SocketIndicator />
                <Sidebar currentUser={currUser} chats={availableChats} />
                {children}
            </div>
        </SocketProvider>
    );
};

export default ChatsLayout;
