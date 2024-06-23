import { db } from "@/lib/prisma-db";
import { Select } from "../select";
import { User } from "next-auth";
import { FormInput } from "./form-input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateGroupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrors } from "./form-errors";
import { FormSubmit } from "./form-submit";
import { Input } from "../ui/input";
import { useTransition } from "react";

const dummyOptions = [
    {
        id: "1",
        name: "azar",
        image: "fake",
    },
    {
        id: "2",
        name: "azain",
        image: "fake",
    },
    {
        id: "3",
        name: "aman",
        image: "fake",
    },
    {
        id: "4",
        name: "adnan",
        image: "fake",
    },
];

export const CreateGroupForm = () => {
    const [isPending, startTransition] = useTransition();
    // const availableFriends = async () => {
    // const data = await;
    // const data = await getAllFriends();
    // // };

    // if (!data) {
    //     return <div>No Data found</div>;
    // }
    const form = useForm<z.infer<typeof CreateGroupSchema>>({
        resolver: zodResolver(CreateGroupSchema),
        defaultValues: {
            name: "",
        },
    });

    return (
        <div className="space-y-4 ">
            <div className="space-y-1">
                <h3 className="text-xl text-light-black font-semibold">Create group</h3>
                <p className="text-neutral-400 text-sm">Create a chat with all of your friends</p>
            </div>

            <Form {...form}>
                <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    // onChange={() => {
                    //     if (error) {
                    //         setError(undefined);
                    //     }
                    // }}
                    className="space-y-6 "
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
                                            placeholder="Lorem ipsum"
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
                            name="members"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Members</FormLabel>
                                    <FormControl>
                                        <Select
                                            options={dummyOptions}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* <FormErrors message={error} /> */}
                    {/* <Button disabled={isPending} type="submit" className="w-full">
                    Login
                </Button> */}
                    <FormSubmit className="ml-auto  float-right self-end" disabled={isPending}>
                        Create
                    </FormSubmit>
                </form>
            </Form>
        </div>
    );
};
