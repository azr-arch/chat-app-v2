import { USER_ONLINE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { User } from "@/manager/user-manager";
import { useSession } from "next-auth/react";

export const useOnlineList = () => {
    const [onlineList, setOnlineList] = useState<User[] | []>([]);
    const [initialized, setInitialized] = useState(false);
    const { data } = useSession();

    useEffect(() => {
        if (!data?.user) return;

        setInitialized(true);

        const userHandler = (data: { activeUsers: User[] }) => {
            setOnlineList(data.activeUsers);
        };

        pusherClient.subscribe(data.user.email!);

        // pusherClient.bind("user::active", (data: { activeUsers: User[] }) => {
        //     console.log("got userActive event");
        //     userHandler(data);
        // });

        return () => {
            pusherClient.unsubscribe(data.user?.email!);

            pusherClient.unbind("user::active", userHandler);
            setInitialized(false);
        };
    }, [data?.user]);

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

    return { onlineList, initialized };
};
