import { auth } from "@/auth";

const ChatsPage = async () => {
    const session = await auth();

    return (
        <div className="w-full h-full bg-main  flex items-center justify-center">
            <p className="text-accent-2">Select a chat to get conversation.</p>
        </div>
    );
};

export default ChatsPage;
