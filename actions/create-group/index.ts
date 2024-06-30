"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "../db/get-current-user";
import { revalidatePath } from "next/cache";
import { CreateGroupSchema } from "@/schemas";

const handler = async (data: InputType): Promise<ReturnType> => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return {
            error: "Unauthorized",
        };
    }

    const { members } = data;
    const isGroup = members.length > 2;

    // Add the current user too in the members list
    members.push({ name: currentUser.name!, email: currentUser.email!, image: currentUser.image! });

    // ADD THE ID IN SESSION OBJECT
    // ADD THE ID IN SELECT OPTION TYPE

    let chat;

    try {
        const chatAlreadyExists = await db.chat.findFirst({
            where: {
                participants: {
                    every: {
                        email: {
                            in: members.map((member) => member.email),
                        },
                    },
                },
            },
        });

        if (chatAlreadyExists) {
            return {
                error: "Conversation already exists.",
            };
        } else {
            const newChat = await db.chat.create({
                data: {
                    participants: {
                        connect: members.map((member) => ({
                            email: member.email,
                        })),
                    },
                    isGroup,
                },
            });

            chat = newChat;
        }
    } catch (error) {
        return {
            error: "Failed to create a group.",
        };
    }

    revalidatePath("/");

    return {
        data: chat,
    };
};

export const createGroupAction = createSafeAction(CreateGroupSchema, handler);
