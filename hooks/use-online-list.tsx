import { USER_ONLINE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const useOnlineList = (socket: Socket | null) => {
    const [onlineList, setOnlineList] = useState<number>(0);

    useEffect(() => {
        if (socket) {
            socket.on(USER_ONLINE, (data: number) => {
                console.log("USER online event triggered");
                setOnlineList(data);
            });
        }
    }, [socket]);

    return { onlineList };
};
