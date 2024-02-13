"use client";

import { useSocket } from "@/context/socket";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    return (
        <div
            title="online-status"
            className={`w-1 aspect-square rounded-full ${
                isConnected ? "text-green-500" : "text-red-500"
            } absolute top-2 left-2 z-20`}
        >
            <ArrowDownUp className="text-inherit w-4 h-4" />
        </div>
    );
};
