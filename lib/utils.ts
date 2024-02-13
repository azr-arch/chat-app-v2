import { getCurrentUser } from "@/actions/get-current-user";
import { Chat, User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { FullChatType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function find(arr: [], query: { id: string }) {
    arr.filter((item) => query.id);
}
