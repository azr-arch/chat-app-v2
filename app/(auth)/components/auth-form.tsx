"use client";

import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { useForm, FieldValues, SubmitHandler, FieldErrors } from "react-hook-form";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/db/get-current-user";
import { FormSubmit } from "@/components/form/form-submit";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import Image from "next/image";

type FormVariant = "LOGIN" | "REGISTER";

const LoginFormSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string({ required_error: " Password is required" }),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

    // const formRef = useRef<ElementRef<"form">>(null);

    const [formVariant, setFormVariant] = useState<FormVariant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/chats");
        }
    }, [session.status, router]);

    const toggleVariant = useCallback(() => {
        if (formVariant === "LOGIN") {
            setFormVariant("REGISTER");
        } else {
            setFormVariant("LOGIN");
        }
    }, [formVariant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        //     setIsLoading(true);
        //     // console.log("click");
        //     // console.log({ data });
        //     // try {
        //     // } catch (error) {
        //     //     console.log({ errors });
        //     // }
        //     if (formVariant === "LOGIN") {
        //         // Login form
        //         signIn("credentials", {
        //             ...data,
        //             redirect: false,
        //         })
        //             .then((cb) => {
        //                 console.log({ cb });
        //                 if (cb?.error) {
        //                     toast.error("Invalid credentials");
        //                 }
        //                 if (cb?.ok && !cb.error) {
        //                     toast.success("Logged in!");
        //                     router.push("/chats");
        //                 }
        //             })
        //             .finally(() => setIsLoading(false));
        //     }
        //     if (formVariant === "REGISTER") {
        //         // Register form
        //         axios
        //             .post("/api/register", data)
        //             .then(() => {
        //                 toast.success("Account created!");
        //                 router.push("/chats");
        //             })
        //             .catch(() => toast.error("Something went wrong!"))
        //             .finally(() => setIsLoading(false));
        //     }
    };

    return (
        <div className="p-6 rounded-md bg-white mt-8 w-full">
            <div className="sm:mx-auto  sm:max-w-md flex flex-col items-center justify-center mb-10 gap-y-2">
                <div className="flex items-center justify-center">
                    <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
                </div>
                <div className="space-y-1">
                    <h2 className=" text-2xl text-gray-900 font-bold text-center">
                        {formVariant === "LOGIN" ? "Sign in to Chatly" : "Create your account"}
                    </h2>
                    <p className="text-sm text-neutral-500 ">
                        {formVariant === "LOGIN"
                            ? "Welcome back! Please sign in to continue."
                            : "Welcome! Please fill in the details to get started."}
                    </p>
                </div>
            </div>

            {formVariant === "LOGIN" ? <LoginForm /> : <RegisterForm />}

            <p
                onClick={toggleVariant}
                className="text-neutral-700 transition hover:opacity-50 hover:underline text-sm text-center mt-8 cursor-pointer"
            >
                {formVariant === "LOGIN" ? "New here ?" : "Already have an account ?"}
            </p>
        </div>
    );
};
