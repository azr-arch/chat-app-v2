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
        authorized({ auth }) {
            const isAuthenticated = auth?.user;
            console.log("auth.ts: ", isAuthenticated);
        },
    },
});
