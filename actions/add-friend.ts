"use server";

import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "./get-current-user";
import { revalidatePath } from "next/cache";

export const addFriendHandler = async ({ email }: { email: string }) => {
    let newChat;
    try {
        const currUser = await getCurrentUser();
        console.log("Friends: ", currUser?.friends);

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
        // const existingChat = currUser.friends.

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
        console.log({ error });
        return {
            error: "Internal error",
        };
    }

    revalidatePath("/");

    return {
        data: newChat,
    };
};

// PART OF FRIEND COLLECTION IMPLEMENTATION

// async function createFriendship(currUserId: string, friendId: string) {
//     try {
//         // await db.user.update({
//         //     where: { id: currUserId },
//         //     data: { friends: { connect: { id: friendId } } },
//         // });

//         // await db.user.update({
//         //     where: { id: friendId },
//         //     data: { friends: { connect: { id: currUserId } } },
//         // });

//         // Creating a mutual friendship
//         await db.user.update({
//             where: { id: currUserId },
//             include: { friends: true },
//             data: {
//                 friends: {
//                     connect: [
//                         {
//                             id: friendId,
//                         },
//                     ],
//                 },
//             },
//         });

//         await db.user.update({
//             where: { id: friendId },
//             include: { friends: true },
//             data: {
//                 friends: {
//                     connect: [
//                         {
//                             id: currUserId,
//                         },
//                     ],
//                 },
//             },
//         });

//         console.log(`Friendship created between users ${currUserId} and ${friendId}`);
//     } catch (error) {
//         console.error("Error creating friendship:", error);
//         throw error;
//     }
// }
