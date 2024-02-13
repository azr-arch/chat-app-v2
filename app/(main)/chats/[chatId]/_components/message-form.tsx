"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
                const res = await axios.post(`/api/chat/${chatId}/message`, {
                    message,
                });

                console.log(res.data);
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
            const resp = await sendMessage({
                chatId,
                senderId,
                content: message || " ",
            });

            console.log({ resp });
        } catch (error) {
            // Fallback method for sending message, in case socket isnt available
            handleSubmitForm(onSubmit);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-orange-400 w-full h-[72px] flex items-center p-2 gap-2">
            <form onSubmit={handleSubmit} className="flex items-stretch w-full h-full gap-2">
                <Input
                    {...register("message")}
                    placeholder="Message..."
                    type="text"
                    autoComplete={"none"}
                    className="h-full"
                    disabled={isLoading}
                    ref={messageRef}
                />
                <Button
                    disabled={isLoading}
                    className="h-full text-black"
                    variant={"outline"}
                    size={"sm"}
                >
                    <Send className="w-5 h-5" />
                </Button>
            </form>
        </div>
    );
};
