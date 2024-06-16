import { MessageItem } from "@/app/(main)/chats/[chatId]/_components/message-item";
import { FullMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import { DateBadge } from "./date-badge";

// SRC: ChatGPT

interface GroupMessageProps {
    messages: (FullMessageType & { isNewDay?: boolean })[];
    otherUser: User;
    currentUserId: string;
}

export const GroupMessage = ({ messages, otherUser, currentUserId }: GroupMessageProps) => {
    let groupedMessages = [];
    let currentGroup: (FullMessageType & { isNewDay?: boolean })[] = [];
    let currentDate = null;

    if (messages.length <= 0) {
        return null;
    }

    for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const prevMsg = messages[i - 1];

        // If the previous message exists and is from the same sender and the same day, add the message to the current group
        if (
            prevMsg &&
            prevMsg.senderId === msg.senderId &&
            moment(prevMsg.updatedAt).isSame(msg.updatedAt, "day")
        ) {
            currentGroup.push(msg);
        } else {
            // If the current group is not empty, add it to the grouped messages
            if (currentGroup.length > 0) {
                groupedMessages.push(currentGroup);
            }

            // Start a new group with the current message
            currentGroup = [msg];
        }

        // Check if the date has changed
        if (!currentDate || !moment(msg.updatedAt).isSame(currentDate, "day")) {
            currentDate = moment(msg.updatedAt);
            msg.isNewDay = true;
        }
    }

    // Add the last group if it's not empty
    if (currentGroup.length > 0) {
        groupedMessages.push(currentGroup);
    }

    return (
        <>
            {groupedMessages.map((group, idx) => {
                const isReceiver = currentUserId !== group[0].senderId;
                const receiverData = group[0].sender;

                return (
                    <div key={group[0].id} className="flex flex-col">
                        {/* Adding date badge here! */}
                        {group[0]?.isNewDay && <DateBadge time={group[0].updatedAt} />}

                        <div
                            key={idx}
                            data-label="chat-messages"
                            className={cn("flex flex-col w-full gap-3 relative")}
                        >
                            {group.map((msg, idx) => {
                                const isLastMessage = messages[messages.length - 1].id === msg.id;

                                return (
                                    <MessageItem
                                        key={msg.id}
                                        data={msg}
                                        otherUser={otherUser}
                                        isLast={isLastMessage}
                                    />
                                );
                            })}

                            {/* Add the profile icon */}
                            {isReceiver && (
                                <div className="absolute w-6 h-6 top-0 left-0 shadow-sm transition-all duration-150 animate-in">
                                    <Image
                                        fill
                                        src={receiverData?.image || "/placeholder.png"}
                                        alt="user-profile"
                                        className="object-cover rounded-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};
