"use client";

import { Socket } from "socket.io-client";

import { SEND_MESSAGE } from "@/lib/constants";
import { MessagePayload } from "@/lib/types";

export const useSocketHandler = (socket: Socket | null) => {
    const sendMessage = (payload: MessagePayload) => {
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject(null);
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

    return {
        sendMessage,
    };
};
