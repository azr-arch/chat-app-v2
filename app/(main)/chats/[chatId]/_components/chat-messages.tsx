"use client";

import { FullChatType, FullMessageType, TypingStatusPayload } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { useOtherUser } from "@/hooks/use-other-user";
import { pusherClient } from "@/lib/pusher";

import { find } from "lodash";
import axios from "axios";
import { GroupMessage } from "@/components/group-message";
import { useDebounce } from "@/hooks/use-debounce";
import { TypingIndicator } from "@/components/typing-indicator";

interface ChatMessagesProps {
    chatData: FullChatType;
    currentUserId: string;
}

export const ChatMessages = ({ chatData, currentUserId }: ChatMessagesProps) => {
    const [messages, setMessages] = useState(chatData.messages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const otherUser = useOtherUser(chatData);
    const [otherPersonTyping, setOtherPersonTyping] = useState(false);
    const debouncedIsTyping = useDebounce(otherPersonTyping, 500);

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

        const typingStatusHandler = (data: TypingStatusPayload) => {
            if (data.senderId !== currentUserId) {
                setOtherPersonTyping(data.isTyping);
            }
        };

        pusherClient.bind("messages:new", newMessageHandler);
        pusherClient.bind("message:update", updateMessageHandler);
        pusherClient.bind("typing::status", typingStatusHandler);

        return () => {
            pusherClient.unsubscribe(chatData.id);
            pusherClient.unbind("message:new", newMessageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
            pusherClient.unbind("typing::status", typingStatusHandler);
        };
    }, [chatData.id, currentUserId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <div
            style={{ maxHeight: "calc(100% - 150px)", scrollbarWidth: "none" }}
            className="overflow-y-scroll w-full flex-grow flex flex-col  gap-2 px-4 "
        >
            {messages.length > 0 ? (
                <GroupMessage
                    messages={messages}
                    otherUser={otherUser}
                    currentUserId={currentUserId}
                />
            ) : (
                <p className="text-sm font-medium text-accent-3">
                    Send a message to start the conversation
                </p>
            )}

            {debouncedIsTyping && <TypingIndicator />}

            <div ref={bottomRef} />
        </div>
    );
};
