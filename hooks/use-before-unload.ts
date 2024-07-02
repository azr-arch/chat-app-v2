"use client";

import { useEffect } from "react";

const isBrowser = () => typeof window !== "undefined";

export const useBeforeUnload = () => {
    console.log("Ran beforeunload");

    useEffect(() => {
        if (!isBrowser) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            console.log("Browser is gonna close");
            alert("You are going to close the browser");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
};
