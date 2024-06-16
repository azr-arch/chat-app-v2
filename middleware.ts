import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { url } = req;
    const isLoggedIn = !!req.auth;
    console.log("URL and LOGGEDIN: ", url, isLoggedIn);
});

export const config = {
    matcher: "/chats/:path*",
};
