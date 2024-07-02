import { getCurrentUser } from "@/actions/db/get-current-user";
import { pusherServer } from "@/lib/pusher";
import { userDb } from "@/lib/user-manager-db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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

        console.log("user added in db");
        const activeUsers = userDb.getActiveUsers();

        activeUsers.map((user) => {
            console.log("emitting to: ", user.email);
            pusherServer.trigger(user.email!, "user::active", {
                activeUsers,
            });
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("[API_USER_JOINED]: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
