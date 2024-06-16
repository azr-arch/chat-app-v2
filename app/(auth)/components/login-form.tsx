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

export const LoginForm = () => {
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
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.errors) {
                        setError(data?.message);
                    }
                })
                .catch((error) => console.log(error));
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
                <Button disabled={isPending} type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </Form>
    );
};
