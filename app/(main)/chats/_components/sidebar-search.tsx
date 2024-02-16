"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SidebarSearch = () => {
    return (
        <div className="w-full py-2 px-3">
            <div className="w-full flex items-center bg-beige rounded-md">
                <Search className="w-5 h-5 ml-3 mr-aut group-focus:text-white/90 transition-colors duration-150 ease-in-out" />

                <Input className="h-9 max-w-[90%] py-2 group px-4 text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
            </div>
        </div>
    );
};
