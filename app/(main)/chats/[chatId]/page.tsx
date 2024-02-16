import { getServerSession } from "next-auth";
import { ChatHeader } from "./_components/chat-header";
import { ChatMessages } from "./_components/chat-messages";
import { MessageForm } from "./_components/message-form";
import { getChatById } from "@/actions/get-chat-by-id";
import { getMessages } from "@/actions/get-messages";
import { getCurrentUser } from "@/actions/get-current-user";

const ChatIdPage = async ({ params }: { params: { chatId: string } }) => {
    const [currentChat, messages, currentUser] = await Promise.all([
        getChatById(params.chatId),
        getMessages(params.chatId),
        getCurrentUser(),
    ]);

    if (!currentChat || !currentUser?.id) {
        return <div>No Chat</div>;
    }

    return (
        <div className="w-full min-w-[342px] h-full flex flex-col items-start gap-2 bg-slateGray ">
            <ChatHeader data={currentChat} />
            <ChatMessages initialMessages={messages || []} chatData={currentChat} />
            <MessageForm senderId={currentUser.id} chatId={params.chatId} />
        </div>
    );
};

export default ChatIdPage;
