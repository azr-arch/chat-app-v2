"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const Logout = () => {
    return (
        <Button onClick={() => signOut()} variant={"outline"}>
            Logout
        </Button>
    );
};
