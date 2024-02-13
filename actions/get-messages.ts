import { db } from "@/lib/prisma-db";

export const getMessages = async (chatId: string) => {
    try {
        const messages = await db.message.findMany({
            where: {
                chatId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return messages;
    } catch (error) {
        return [];
    }
};
