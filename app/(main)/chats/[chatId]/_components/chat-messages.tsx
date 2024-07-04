"use client";

import { useEffect, useRef, useState } from "react";
import { FullChatType, FullMessageType, TypingStatusPayload } from "@/lib/types";
import { pusherClient } from "@/lib/pusher";

import { GroupMessage } from "@/components/group-message";
import { TypingIndicator } from "@/components/typing-indicator";
import { useOtherUser } from "@/hooks/use-other-user";
import { useDebounce } from "@/hooks/use-debounce";
import { find } from "lodash";
import axios from "axios";

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
    }, [messages, debouncedIsTyping]);

    return (
        <div
            style={{ maxHeight: "calc(100% - 150px)", scrollbarWidth: "none" }}
            className="overflow-y-scroll w-full flex-grow flex flex-col  gap-2 px-4 relative"
        >
            {messages.length > 0 ? (
                <GroupMessage
                    messages={messages}
                    otherUser={otherUser}
                    currentUserId={currentUserId}
                />
            ) : (
                <p className="text-sm font-medium text-accent-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    Send a message to start the conversation
                </p>
            )}

            {debouncedIsTyping && <TypingIndicator />}

            <div ref={bottomRef} />
        </div>
    );
};
