import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "../get-current-user";

export const getChats = async () => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return [];

        const chat = await db.chat.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: {
                participants: {
                    some: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                participants: true,
                messages: {
                    include: {
                        seen: {
                            select: {
                                id: true,
                                email: true,
                            },
                        },
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });

        if (!chat) {
            return [];
        }

        return chat;
    } catch (error: any) {
        console.log(error, "SERVER_ERROR ");
        return [];
    }
};
