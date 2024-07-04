"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormSubmit } from "./form-submit";
import { Input } from "../ui/input";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGroupAction } from "@/actions/create-group";
import { SelectOptions } from "@/lib/types";
import { useSafeAction } from "@/hooks/use-safe-action";
import { useAddChatModal } from "@/hooks/use-add-chat-modal";
import { CreateGroupSchema } from "@/schemas";
import { ElementRef, useRef } from "react";

export const CreateGroupForm = ({ friends }: { friends?: SelectOptions[] }) => {
    const { onClose } = useAddChatModal();

    const { execute, isLoading } = useSafeAction(createGroupAction, {
        onError: (data) => {
            toast.error(data);
        },
        onSuccess: () => {
            toast.success("Group created succesfully.");
            onClose();
        },
    });

    const form = useForm<z.infer<typeof CreateGroupSchema>>({
        resolver: zodResolver(CreateGroupSchema),
        defaultValues: {
            name: "",
        },
    });

    const formRef = useRef<ElementRef<"form">>(null);

    const onSubmit = (data: FormData) => {
        const name = data.get("name") as string;
        const members = form.getValues("members");

        execute({
            name,
            members,
        });
    };

    return (
        <div className="space-y-4 ">
            <div className="space-y-1">
                <h3 className="text-xl text-light-black font-semibold">Create group</h3>
                <p className="text-neutral-400 text-sm">Create a chat with all of your friends</p>
            </div>

            <Form {...form}>
                <form ref={formRef} action={onSubmit} className="space-y-6 ">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Lorem ipsum"
                                            type="text"
                                            disabled={isLoading}
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
                                            options={friends}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormSubmit
                        className="ml-auto  float-right self-end"
                        disabled={form.formState.isSubmitting || isLoading}
                    >
                        Create
                    </FormSubmit>
                </form>
            </Form>
        </div>
    );
};
