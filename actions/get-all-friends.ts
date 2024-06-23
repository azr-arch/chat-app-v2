import { auth } from "@/auth";
import { db } from "@/lib/prisma-db";
import { getCurrentUser } from "./get-current-user";

// PART OF FRIEND COLLECTION IMPLEMENTATION

// export const getAllFriends = async () => {
//     const currUser = await getCurrentUser();

//     if (!currUser) return [];

//     const data = await db.user.findUnique({
//         where: {
//             id: currUser.id,
//         },
//         include: {
//             friends: true,
//         },
//     });

//     return data ? data : [];
// };

//  ------------------------------------------------------

export const getAllFriends = async () => {
    const currUser = await getCurrentUser();

    if (!currUser) return [];

    const data = await db.user.findMany({
        where: {
            NOT: {
                email: currUser.email,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data ? data : [];
};
