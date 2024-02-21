"use client";

import { useAddFriendModal } from "@/hooks/use-add-friend-modal";
import { Modal } from "../ui/modal";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addFriendHandler } from "@/actions/add-friend";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

// Todo add zod + react hook form for validation
export const AddUserModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { pending } = useFormStatus();
    const { isOpen, onClose } = useAddFriendModal();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const onSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        setLoading(true);
        console.log("submitting");
        try {
            const res = await addFriendHandler({ email });
            if (res?.error) {
                toast.error(res.error);
                return;
            }

            if (res?.data) {
                toast.success("Friend added succesfully");
                return;
            }
        } catch (error) {
            toast.error("Server Error");
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Add a contact"
            description="Add a new friend and start chatting"
            isOpen={isOpen}
            onOpenChange={onClose}
        >
            <form action={onSubmit} className="w-full space-y-2">
                <div className="space-y-1">
                    <Input
                        name="email"
                        type="email"
                        required
                        placeholder="Your friend's email here"
                        className="placeholder:text-xs"
                        disabled={pending || loading}
                    />
                </div>
                <Button disabled={pending || loading} type="submit">
                    Submit
                </Button>
            </form>
        </Modal>
    );
};
