import { getCurrentUser } from "@/actions/db/get-current-user";
import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const currUser = await getCurrentUser();

//         if (!currUser || !currUser.email) {
//             return new NextResponse("Unauthorized", { status: 400 });
//         }

//         const { userId } = await req.json();

//         const existingChats = await db.chat.findMany({
//             where: {
//                 OR: [
//                     {
//                         userIds: {
//                             equals: [currUser.id, userId],
//                         },
//                     },
//                     {
//                         userIds: {
//                             equals: [userId, currUser.id],
//                         },
//                     },
//                 ],
//             },
//             include: {
//                 participants: true,
//             },
//         });

//         const existingChat = existingChats[0];

//         if (existingChat) {
//             return NextResponse.json(existingChat);
//         }

//         // If not existing chat

//         const newChat = await db.chat.create({
//             data: {
//                 participants: {
//                     connect: [
//                         {
//                             id: currUser.id,
//                         },
//                         {
//                             id: userId,
//                         },
//                     ],
//                 },
//             },
//             include: {
//                 participants: true,
//             },
//         });

//         return NextResponse.json(newChat);
//     } catch (error) {
//         console.log("[CHAT]", error);
//         return new NextResponse("Internal error", { status: 500 });
//     }
// }
