import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function find(arr: [], query: { id: string }) {
    arr.filter((item) => query.id);
}

export const formatMessageTime = (messageTimestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(messageTimestamp);

    // Check if the message was sent today
    if (messageDate.toDateString() === now.toDateString()) {
        return format(messageDate, "p"); // Display literal time
    }

    // Check if the message was sent yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    // For previous days, format as "dd/MM/yyyy"
    return format(messageDate, "dd/MM/yyyy");
};
