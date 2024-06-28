import { USER_ONLINE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

export const useOnlineList = () => {
    const [onlineList, setOnlineList] = useState<{ id: string; name: string }[] | []>([]);

    useEffect(() => {
        pusherClient.subscribe("USER");

        pusherClient.bind(USER_ONLINE, ({ data }: { data: { id: string; name: string }[] }) => {
            setOnlineList(data);
        });
    }, []);

    return { onlineList };
};
