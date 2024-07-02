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

        // Removing user from the list of active users
        userDb.removeUser(currUser.id);

        await pusherServer.trigger("userJoinAndLeftChannel", "userLeft", {
            activeList: userDb.getActiveUsers(),
        });

        return NextResponse.json({ success: true, data: userDb.getActiveUsers() });
    } catch (error) {
        console.log("[API_USER_LEAVE]: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
