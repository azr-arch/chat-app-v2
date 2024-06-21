"use server";

import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "./get-current-user";
import { revalidatePath } from "next/cache";

export const addFriendHandler = async ({ email }: { email: string }) => {
    let newChat;
    try {
        const currUser = await getCurrentUser();
        if (!currUser || !email)
            return {
                error: "Invalid fields",
            };

        const friend = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!friend) {
            return {
                error: "Friend not found!",
            };
        }

        // Find an already existing chat with curr user and friend
        const existingChat = await db.chat.findFirst({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currUser.id, friend.id],
                        },
                    },
                    {
                        userIds: {
                            equals: [friend.id, currUser.id],
                        },
                    },
                ],
            },
        });

        if (existingChat) {
            return {
                error: "Already a friend!",
            };
        }

        newChat = await db.chat.create({
            data: {
                participants: {
                    connect: [
                        {
                            id: currUser.id,
                        },
                        {
                            id: friend.id,
                        },
                    ],
                },
            },
            include: {
                participants: true,
            },
        });
    } catch (error) {
        return {
            error: "Internal error",
        };
    }

    revalidatePath("/");

    return {
        data: newChat,
    };
};
