"use client";

import { useEffect, useState } from "react";
import { CreateGroupForm } from "../form/create-group-form";
import { Button } from "../ui/button";
import { SelectOptions } from "@/lib/types";
import { useAddChatModal } from "@/hooks/use-add-chat-modal";
import { X } from "lucide-react";
interface AddChatModalProps {
    friends?: SelectOptions[];
}

// Modal to create a chat
export const AddChatModal = ({ friends }: AddChatModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onClose } = useAddChatModal();

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
