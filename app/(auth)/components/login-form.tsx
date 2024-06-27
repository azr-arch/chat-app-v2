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

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErrors } from "@/components/form/form-errors";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { FormSubmit } from "@/components/form/form-submit";

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<undefined | string>(undefined);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setLoading(true); // This is temporary, not a good practice

        login(values)
            .then((data) => {
                if (data?.errors) {
                    startTransition(() => {
                        setError(data?.error);
                    });
                    return;
                }
                form.reset();
                toast.success("Login succesfully");
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
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
            >
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
                <FormSubmit className="w-full" disabled={isPending}>
                    Login
                </FormSubmit>
            </form>
        </Form>
    );
};
