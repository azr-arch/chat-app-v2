import { db } from "@/lib/prisma-db";

export const getMessages = async (chatId: string) => {
    try {
        const messages = await db.message.findMany({
            where: {
                chatId,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                seen: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
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
