"use client";

import { useBeforeUnload } from "@/hooks/use-before-unload";
import { useEffect } from "react";

const ChatsPage = () => {
    // This could be useState, useOptimistic, or other state
    let pending = false;

    useEffect(() => {
        function beforeUnload(e: BeforeUnloadEvent) {
            if (!pending) return;
            e.preventDefault();
        }

        window.addEventListener("beforeunload", beforeUnload);

        return () => {
            window.removeEventListener("beforeunload", beforeUnload);
        };
    }, [pending]);

    return (
        <div className="w-full h-full bg-main  flex items-center justify-center">
            <p className="text-accent-2">Select a chat to get conversation.</p>
        </div>
    );
};

export default ChatsPage;
