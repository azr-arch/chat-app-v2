"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma-db";
import { revalidatePath } from "next/cache";

export const getUserByEmail = async ({ email }: { email: string }) => {
    try {
        const currUser = await auth();

        if (!currUser?.user || !email) {
            return {
                error: true,
                message: "Invalid field",
            };
        }

        const friendExists = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (currUser.user.email === email) {
            return {
                error: true,
                message: "Can't add yourself!, please check the given email",
            };
        }

        if (!friendExists) {
            return {
                error: true,
                message: "User not found",
            };
        }

        revalidatePath("/chats");

        return {
            data: friendExists,
        };
    } catch (error) {}
};
