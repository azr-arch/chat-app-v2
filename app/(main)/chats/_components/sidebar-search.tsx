"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

const routerOptions = {
    shallow: true,
};

export const SidebarSearch = () => {
    // TODO: Improve Performance here
    // const searchParams = useSearchParams();
    // const pathName = usePathname();
    // const router = useRouter();

    // const createQueryString = useCallback(
    //     (name: string, value: string) => {
    //         if (!searchParams) return;

    //         const params = new URLSearchParams(searchParams);
    //         params.set(name, value);

    //         return params.toString();
    //     },
    //     [searchParams]
    // );

    // const clearParams = useCallback(() => {
    //     router.push(pathName, routerOptions);
    // }, [pathName, router]);

    // const handleSearch = useCallback(
    //     (event: ChangeEvent<HTMLInputElement>) => {
    //         const inputValue = event.target.value;
    //         if (inputValue === "") {
    //             clearParams();
    //         } else {
    //             const queryString = createQueryString("search", inputValue);
    //             router.push(`${pathName}/?${queryString}`, routerOptions);
    //         }
    //     },
    //     [clearParams, createQueryString, pathName, router]
    // );

    return (
        <div className="w-full py-2 px-3">
            <div className="w-full text-[#6e7176] flex items-center bg-[#1c1d1f]  rounded-md">
                <Search className="w-5 h-5 ml-3 mr-aut group-focus:text-white/90 transition-colors duration-150 ease-in-out" />

                <Input
                    className="h-9 max-w-[90%]  py-2 group px-4 text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search"
                    // onChange={handleSearch}
                    // value={searchParams?.get("search") || ""}
                />
            </div>
        </div>
    );
};
