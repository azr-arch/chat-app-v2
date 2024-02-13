import { getCurrentUser } from "@/actions/get-current-user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const currUser = await getCurrentUser();

        if (!currUser || !currUser.email) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        return;
    } catch (err) {
        console.log({ err });
    }
}
