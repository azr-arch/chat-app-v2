import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "./get-current-user";

export const getChatById = async (chatId: string) => {
    try {
        const chat = await db.chat.findUnique({
            where: {
                id: chatId,
            },
            include: {
                participants: true,
            },
        });

        if (!chat) {
            return null;
        }

        return chat;
    } catch (error: any) {
        console.log(error, "SERVER_ERROR");
        return null;
    }
};
