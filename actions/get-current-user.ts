import { db } from "@/lib/prisma-db";
// import { getSession } from "./get-session";

export const getCurrentUser = async () => {
    try {
        // const session = await getSession();
        // if (!session?.user?.email) return null;
        // const currentUser = await db.user.findUnique({
        //     where: {
        //         email: session.user.email,
        //     },
        // });
        // return currentUser;
    } catch (error: any) {
        return null;
    }
};
