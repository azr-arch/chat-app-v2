import { USER_ONLINE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Socket } from "socket.io-client";
import { UserPayload } from "@/lib/types";

export const useOnlineList = () => {
    const [onlineList, setOnlineList] = useState<UserPayload[] | []>([]);

    useEffect(() => {
        pusherClient.subscribe("USER");

        pusherClient.bind(USER_ONLINE, ({ data }: { data: { id: string; name: string }[] }) => {
            console.log("getting userOnline event on client: ", data);
            setOnlineList(data);
        });
    }, []);

    console.log({ onlineList });

    // useEffect(() => {
    //     pusherClient.subscribe("userJoinAndLeftChannel");

    //     const userHandler = (data: { activeList: User[] }) => {
    //         setOnlineList(data.activeList);
    //     };

    //     // Can combine these two ?
    //     pusherClient.bind("userJoin", (data: { activeList: User[] }) => {
    //         // console.log("UserJoin event triggered: ", data);
    //         console.log("getting userJoin event");
    //         userHandler(data);
    //     });
    //     pusherClient.bind("userLeft", userHandler);

    //     console.log("subscribed to related events");

    //     return () => {
    //         pusherClient.unsubscribe("userJoinAndLeftChannel");

    //         pusherClient.unbind("userJoin", userHandler);
    //         pusherClient.unbind("userLeft", userHandler);
    //     };
    // }, []);

    return { onlineList };
};
