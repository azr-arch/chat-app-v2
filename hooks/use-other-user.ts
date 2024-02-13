import { FullChatType } from "@/lib/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useOtherUser = (
    chat:
        | FullChatType
        | {
              participants: User[];
          }
) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;

        const receiver = chat.participants.filter((user) => user.email !== currentUserEmail);

        return receiver[0];
    }, [chat.participants, session.data?.user?.email]);

    return otherUser;
};
