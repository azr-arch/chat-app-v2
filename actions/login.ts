"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";

import * as z from "zod";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validateFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            // redirectTo: "/chats",
        });
    } catch (error) {
        console.log("Error from actions: ", error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "credentials error",
                        errors: {
                            credentials: "incorrect email or password",
                        },
                    };

                case "InvalidLoginError":
                    return {
                        message: error.message,
                        errors: {
                            invalid_user: "invalid email",
                        },
                    };

                default:
                    return {
                        message: "incorrect email or password",
                        errors: {
                            unknown: "unknown error",
                        },
                    };
            }
        }
        console.log("[LOGIN_ACTION]: ", error);
        throw error;
    }
};
