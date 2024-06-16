import Credentials from "next-auth/providers/credentials";
import { AuthError, CredentialsSignin, NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas";
import { db } from "./lib/prisma-db";

class InvalidLoginError extends AuthError {
    message = "No account is linked with the provided email address.";
}

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;
                    const user = await db.user.findUnique({
                        where: {
                            email,
                        },
                    });

                    console.log("User: ", user);

                    // If user has made an account with other providers like
                    // Github or google, then there hashedpassword field will be empty.
                    if (!user || !user.hashedPassword) throw new InvalidLoginError();

                    console.log("Passed from User");

                    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

                    console.log(passwordsMatch);

                    if (passwordsMatch) {
                        console.log("Passwords Match!");
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
