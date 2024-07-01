import { getCurrentUser } from "@/actions/db/get-current-user";
import { pusherServer } from "@/lib/pusher";
import { userDb } from "@/lib/user-manager-db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const currUser = await getCurrentUser();

        if (!currUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        userDb.addUser({
            id: currUser.id,
            username: currUser.name!,
            image: currUser.image!,
            email: currUser.email!,
        });

        await pusherServer.trigger("userJoinedChannel", "userJoinedSucces", {
            activeList: userDb.getActiveUsers(),
        });

        console.log("user added to activeList on server");
    } catch (error) {
        console.log("[API_USER_JOINED]: ", error);
    }
};
