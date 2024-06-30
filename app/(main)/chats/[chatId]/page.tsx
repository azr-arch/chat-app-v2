import { ChatHeader } from "./_components/chat-header";
import { ChatMessages } from "./_components/chat-messages";
import { MessageForm } from "./_components/message-form";
import { getChatById } from "@/actions/db/get-chat/get-chat-by-id";
import { getCurrentUser } from "@/actions/db/get-current-user";

const ChatIdPage = async ({ params }: { params: { chatId: string } }) => {
    const [currentChat, currentUser] = await Promise.all([
        getChatById(params.chatId),
        getCurrentUser(),
    ]);

    if (!currentChat || !currentUser?.id) {
        return <div className="text-accent-2">No Chat</div>;
    }

    return (
        <div className="w-full min-w-[342px] h-full flex flex-col items-start gap-2 bg-main ">
            <ChatHeader data={currentChat} />
            <ChatMessages chatData={currentChat} currentUserId={currentUser.id} />
            <MessageForm senderId={currentUser.id} chatId={params.chatId} />
        </div>
    );
};

export default ChatIdPage;
