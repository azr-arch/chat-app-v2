"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "@/components/upload";
import { useSocket } from "@/context/socket";
import { useSocketHandler } from "@/hooks/use-socket-handler";
import { TYPING_TIMER_LENGTH } from "@/lib/constants";
import axios from "axios";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    message: string;
};

let typingTimer: string | number | NodeJS.Timeout | undefined;

export const MessageForm = ({ chatId, senderId }: { chatId: string; senderId: string }) => {
    const { register, handleSubmit: handleSubmitForm, reset, formState } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const { socket } = useSocket();
    const { sendMessage, updateTypingStatus } = useSocketHandler(socket);
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
            } finally {
                reset();
            }
        },
        [chatId, reset]
    );

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const message = messageRef?.current?.value;
            if (message === "" || !messageRef?.current?.value) {
                return;
            }

            // Stopping typing event
            updateTypingStatus({ senderId, chatId, isTyping: false });
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
                try {
                    await onSubmit({ message: messageRef.current.value });
                } catch (error) {
                    console.log("Error sending message: ", error);
                    toast.error("Network issue!, please try again later");
                }
            } finally {
                setIsLoading(false);
                reset();
                messageRef.current.value = "";
            }
        },
        [chatId, onSubmit, reset, sendMessage, senderId, updateTypingStatus]
    );

    const handleChange = () => {
        if (!isTyping) {
            setIsTyping(true);
            updateTypingStatus({ chatId, isTyping: true, senderId });
        }

        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            setIsTyping(false);
            updateTypingStatus({ chatId, isTyping: false, senderId });
        }, TYPING_TIMER_LENGTH);
    };

    return (
        <div className="w-full h-[62px] self-end px-4">
            <div className="bg-light-black-2 flex items-center px-4 py-2 gap-2 rounded-2xl">
                <form onSubmit={handleSubmit} className="flex items-stretch w-full h-full gap-2">
                    <Input
                        {...register("message")}
                        placeholder="Your Message"
                        type="text"
                        autoComplete="none"
                        className="h-full bg-transparent text-white  focus-visible:ring-0 focus-visible:ring-offset-0 border-0 rounded-sm placeholder:text-placeholder"
                        disabled={isLoading}
                        ref={messageRef}
                        onChange={handleChange}
                    />
                    <Button
                        disabled={isLoading}
                        className="h-auto w-fit text-white hover:text-placeholder hover:bg-transparent px-1"
                        variant={"submit"}
                        size={"sm"}
                    >
                        <Send className="w-4 h-4 " />
                    </Button>
                </form>
                <Upload chatId={chatId} />
            </div>
        </div>
    );
};
