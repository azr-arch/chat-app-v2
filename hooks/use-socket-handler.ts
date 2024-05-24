"use client";

import { Socket } from "socket.io-client";

import { SEND_MESSAGE, TYPING_STATUS } from "@/lib/constants";
import { MessagePayload, TypingStatusPayload } from "@/lib/types";

export const useSocketHandler = (socket: Socket | null) => {
    const sendMessage = (payload: MessagePayload) => {
        console.log("sending message with SocketHandler");
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject("Socket not connected");
                return;
            }

            socket.timeout(30000).emit(SEND_MESSAGE, payload, (err: any, sentMessage: any) => {
                if (err) {
                    console.log({ err });
                    reject(err);
                    return;
                }
                resolve(sentMessage);
            });
        });
    };

    const updateTypingStatus = (payload: TypingStatusPayload) => {
        if (!socket?.connected) {
            return;
        }

        socket.emit(TYPING_STATUS, payload);
    };

    return {
        sendMessage,
        updateTypingStatus,
    };
};
