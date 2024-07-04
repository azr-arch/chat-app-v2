import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/prisma-db";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        // async session({ session, token, user }) {
        //     console.log({ session, token, user });
        //     if (session?.user) {
        //         const userExists = await db.user.findUnique({
        //             where: {
        //                 email: session.user.email,
        //             },
        //         });
        //         if (userExists) {
        //             return session;
        //         }
        //     }
        //     return null;
        // },
    },
});
