"use server";

import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "./get-current-user";
import { revalidatePath } from "next/cache";

export const addFriendHandler = async ({ email }: { email: string }) => {
    try {
        const currUser = await getCurrentUser();
        if (!currUser || !email)
            return {
                error: "Invalid fields",
            };

        const friendExists = await db.user.findUnique({
            where: {
                email,
            },
        });

        // Friend with given email doesnt exists
        if (!friendExists)
            return {
                error: "User not found",
            };

        const existingChat = await db.chat.findFirst({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currUser.id, friendExists.id],
                        },
                    },
                    {
                        userIds: {
                            equals: [friendExists.id, currUser.id],
                        },
                    },
                ],
            },
        });

        if (existingChat) {
            return {
                error: "already a friend",
            };
        }

        const newChat = await db.chat.create({
            data: {
                participants: {
                    connect: [
                        {
                            id: currUser.id,
                        },
                        {
                            id: friendExists.id,
                        },
                    ],
                },
            },
            include: {
                participants: true,
            },
        });

        revalidatePath("/chats");

        return {
            data: newChat,
        };
    } catch (error) {
        return {
            error: "Internal error",
        };
    }
};
