"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "@/components/upload";
import { useSocket } from "@/context/socket";
import { useSocketHandler } from "@/hooks/use-socket-handler";
import axios from "axios";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

type FormData = {
    message: string;
};

export const MessageForm = ({ chatId, senderId }: { chatId: string; senderId: string }) => {
    const { register, handleSubmit: handleSubmitForm, reset, formState } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);

    const { socket } = useSocket();
    const { sendMessage } = useSocketHandler(socket);
    const messageRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = useCallback(
        async (data: FormData) => {
            const message = data.message;

            try {
                await axios.post(`/api/chat/${chatId}/message`, {
                    message,
                });
            } catch (error) {
                console.log(error);
            }

            reset();
        },
        [chatId, reset]
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = messageRef?.current?.value;
        if (message === "" || !messageRef?.current?.value) {
            return;
        }

        // Emit typing status
        // TODO
        setIsLoading(true);
        try {
            await sendMessage({
                chatId,
                senderId,
                content: message || " ",
            });
        } catch (error) {
            console.log({ error });
            // Fallback method for sending message, in case socket isnt available
            // handleSubmitForm(onSubmit);
            await onSubmit({ message: messageRef.current.value });
        } finally {
            setIsLoading(false);
            reset();
        }
    };

    return (
        <div className="bg-beige w-full h-[62px] self-end flex items-center px-4 py-2 gap-2 mt-auto">
            <Upload chatId={chatId} />
            <form onSubmit={handleSubmit} className="flex items-stretch w-full h-full gap-2">
                <Input
                    {...register("message")}
                    placeholder="Message..."
                    type="text"
                    autoComplete={"none"}
                    className="h-full bg-darkGray/20 text-black  focus-visible:ring-0 focus-visible:ring-offset-1 focus-visible:ring-lightGray border-darkGray rounded-sm"
                    disabled={isLoading}
                    ref={messageRef}
                />
                <Button
                    disabled={isLoading}
                    className="h-auto w-fit text-black hover:bg-transparent px-1"
                    variant={"submit"}
                    size={"sm"}
                >
                    <Send className="w-4 h-4 " />
                </Button>
            </form>
        </div>
    );
};
