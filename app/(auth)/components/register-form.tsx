"use client";

import * as z from "zod";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErrors } from "@/components/form/form-errors";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<undefined | string>(undefined);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const fileRef = form.register("profilePicture", { required: true });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log("Submitting ");
        const validateFields = RegisterSchema.safeParse(values);

        if (!validateFields.success) {
            startTransition(() => {
                setError("Invalid fields.");
            });
            return;
        }

        // Create a new FormData instance
        const formData = new FormData();

        // Append each value from 'values' to formData
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        // Append 'profilePicture' file to formData
        if (values.profilePicture[0]) {
            formData.set("profilePicture", values.profilePicture[0]);
        }

        startTransition(() => {
            // Pass formData to your register function instead of values
            register(formData)
                .then((data) => {
                    if (data?.error) {
                        setError(data.message);
                        return;
                    }
                })
                .catch((err) => console.log(err));
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onChange={() => {
                    if (error) {
                        setError(undefined);
                    }
                }}
                className="space-y-6"
                // action={() => {
                //     console.log("form submit");
                //     form.handleSubmit(onSubmit);
                // }}
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="for@example.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile photo</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type="file" {...fileRef} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormErrors message={error} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Create an account
                </Button>
            </form>
        </Form>
    );
};