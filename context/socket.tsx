"use client";

import { USER_JOINED } from "@/lib/constants";
import { UserPayload } from "@/lib/types";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { boolean } from "zod";

interface SocketProps {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketProps>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

let socket: Socket | null = null;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const socketInitializer = async () => {
        const res = await fetch("/api/socket/io");
        socket = io();
        if (socket) {
            setIsConnected(true);

            // Todo: Register user as online with email id obtained from localstorage
            // This will help in implementing online status feature
        }
    };

    useEffect(() => {
        if (socket) return;

        socketInitializer();

        return () => {
            socket?.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
    );
};
