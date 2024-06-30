"use client";

import { useAddFriendModal } from "@/hooks/use-add-friend-modal";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { CreateGroupForm } from "../form/create-group-form";
import { SelectOptions } from "@/lib/types";
interface AddUserModalProps {
    friends?: SelectOptions[];
}

// Modal to create chat
export const AddUserModal = ({ friends }: AddUserModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onClose } = useAddFriendModal();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div
            data-state={isOpen}
            className="fixed top-0 left-0 z-[1000] w-screen h-screen flex items-center bg-black/80 justify-center data-[state=true]:opacity-100 data-[state=false]:opacity-0 data-[state=false]:-z-10 transition-all duration-200 ease-in-out"
        >
            <div className="w-[70%] h-fit  bg-white rounded-2xl p-10 relative">
                <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50"
                    size={"icon"}
                    variant={"ghost"}
                >
                    <X className="w-4 h-4" />
                </Button>

                <CreateGroupForm friends={friends} />
            </div>
        </div>
    );
};
