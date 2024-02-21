"use client";

import { FullChatType, FullMessageType } from "@/lib/types";
import { Chat, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { MessageItem } from "./message-item";
import { useOtherUser } from "@/hooks/use-other-user";
import { pusherClient } from "@/lib/pusher";

import { find } from "lodash";
import axios from "axios";

interface ChatMessagesProps {
    chatData: FullChatType;
}

export const ChatMessages = ({ chatData }: ChatMessagesProps) => {
    const [messages, setMessages] = useState(chatData.messages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const otherUser = useOtherUser(chatData);

    useEffect(() => {
        if (messages.length > 0) {
            axios.post(`/api/chat/${chatData.id}/seen`).catch((err) => console.log(err));
        }
    }, [chatData.id, messages.length]);

    useEffect(() => {
        pusherClient.subscribe(chatData.id);
        bottomRef.current?.scrollIntoView();

        const newMessageHandler = (newMessage: FullMessageType) => {
            axios.post(`/api/chat/${chatData.id}/seen`);

            setMessages((prev) => {
                if (find(prev, { id: newMessage.id })) {
                    return prev;
                }
                return [...prev, newMessage];
            });
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((prev) =>
                prev.map((currentMsg) => {
                    if (currentMsg.id === newMessage.id) {
                        return newMessage;
                    }

                    return currentMsg;
                })
            );
        };

        pusherClient.bind("messages:new", newMessageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(chatData.id);
            pusherClient.unbind("message:new", newMessageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        };
    }, [chatData.id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages]);

    // Find the index of the last message
    const lastReceiverMessageIndex = messages.reduce((lastIndex, message, idx) => {
        return message.senderId === otherUser.id ? idx : lastIndex;
    }, -1);

    const lastSenderMessageIndex = messages.reduce((lastIndex, message, idx) => {
        return message.senderId !== otherUser.id ? idx : lastIndex;
    }, -1);

    return (
        <div
            style={{ maxHeight: "calc(100% - 150px)", scrollbarWidth: "none" }}
            className="overflow-y-scroll w-full flex-grow flex flex-col  gap-2 px-4 "
        >
            {messages.length > 0 ? (
                messages.map((message, idx) => (
                    <MessageItem
                        key={message.id}
                        data={message}
                        otherUser={otherUser}
                        // isLastRecevier={idx === lastReceiverMessageIndex}
                        isLast={idx === lastReceiverMessageIndex || idx === lastSenderMessageIndex}
                        // isLastSender={}
                    />
                ))
            ) : (
                <p className="text-sm font-medium ">Send a message to start the conversation</p>
            )}

            <div ref={bottomRef} />
        </div>
    );
};
