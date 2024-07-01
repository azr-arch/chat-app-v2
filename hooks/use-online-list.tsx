import { USER_ONLINE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { User } from "@/manager/user-manager";

export const useOnlineList = () => {
    const [onlineList, setOnlineList] = useState<User[] | []>([]);

    useEffect(() => {
        pusherClient.subscribe("userJoinedChannel");

        pusherClient.bind("userJoinedSucces", (data: { activeList: User[] }) => {
            setOnlineList(data.activeList);
        });
    }, []);

    return { onlineList };
};
