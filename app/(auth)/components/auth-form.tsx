"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";

type FormVariant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

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
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (formVariant === "LOGIN") {
            // Login form
            signIn("credentials", {
                ...data,
                redirect: false,
            })
                .then((cb) => {
                    console.log({ cb });
                    if (cb?.error) {
                        toast.error("Invalid credentials");
                    }

                    if (cb?.ok && !cb.error) {
                        toast.success("Logged in!");
                        router.push("/chats");
                    }
                })
                .finally(() => setIsLoading(false));
        }

        if (formVariant === "REGISTER") {
            // Register form
            axios
                .post("/api/register", data)
                .then(() => {
                    toast.success("Account created!");
                    router.push("/chats");
                })
                .catch(() => toast.error("Something went wrong!"))
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <div className="p-6 rounded-md bg-white mt-8 w-full">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {formVariant === "REGISTER" && (
                    <FormInput
                        id="name"
                        placeholder="Name"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                )}
                <FormInput
                    id="email"
                    placeholder="Email Address"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
                <FormInput
                    id="password"
                    placeholder="Password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />

                <div>
                    <Button disabled={isLoading} className="w-full" variant={"default"}>
                        {formVariant === "LOGIN" ? "Login" : "Register"}
                    </Button>
                </div>
            </form>

            <p
                onClick={toggleVariant}
                className="text-neutral-700 transition hover:opacity-50 hover:underline text-sm text-center mt-8 cursor-pointer"
            >
                {formVariant === "LOGIN" ? "New here ?" : "Already have an account ?"}
            </p>
        </div>
    );
};
