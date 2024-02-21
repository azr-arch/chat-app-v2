import { ChatHeader } from "./_components/chat-header";
import { ChatMessages } from "./_components/chat-messages";
import { MessageForm } from "./_components/message-form";
import { getChatById } from "@/actions/get-chat/get-chat-by-id";
import { getCurrentUser } from "@/actions/get-current-user";

const ChatIdPage = async ({ params }: { params: { chatId: string } }) => {
    const [currentChat, currentUser] = await Promise.all([
        getChatById(params.chatId),
        getCurrentUser(),
    ]);

    if (!currentChat || !currentUser?.id) {
        return <div>No Chat</div>;
    }

    return (
        <div className="w-full min-w-[342px] h-full flex flex-col items-start gap-2 bg-slateGray ">
            <ChatHeader data={currentChat} />
            <ChatMessages chatData={currentChat} />
            <MessageForm senderId={currentUser.id} chatId={params.chatId} />
        </div>
    );
};

export default ChatIdPage;
