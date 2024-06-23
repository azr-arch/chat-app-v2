"use client";

import { SelectOptions } from "@/lib/types";
import { ChevronDown, Cross, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SelectProps {
    value?: SelectOptions[];
    onChange: (values?: SelectOptions[]) => void;
    options: SelectOptions[];
}

export const Select = ({ value, onChange, options }: SelectProps) => {
    const [isOptionsEnabled, setIsOptionsEnabled] = useState<boolean>(false);

    const handleSelect = (selectedValue: SelectOptions) => {
        // Check if the selected value is already in the array
        const isSelected = value?.some((v) => v.id === selectedValue.id);

        // Toggle the value (add or remove) based on selection
        const newValues = isSelected
            ? value?.filter((v) => v.id !== selectedValue.id) // Remove the value
            : [...(value || []), selectedValue]; // Add the value

        onChange?.(newValues);
    };

    return (
        <div
            className="w-full relative border-[0.1em] border-neutral-400 rounded-sm min-h-[2.5em] flex items-center p-2"
            tabIndex={0}
        >
            <span className="grow flex items-center gap-2">
                {value && value.length > 0 ? (
                    value.map((item) => (
                        <span
                            key={item.id}
                            className="text-sm bg-neutral-200 rounded-sm p-1 flex items-center gap-x-2  w-fit"
                        >
                            <span className="w-4 h-4 bg-black rounded-full"></span>
                            {item.name}
                            <Button
                                variant={"ghost"}
                                className="w-fit h-fit p-1"
                                onClick={() => handleSelect(item)}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </span>
                    ))
                ) : (
                    <span className="text-sm text-neutral-500">Select...</span>
                )}
            </span>
            <Button className={""} size={"sm"} variant={"outline"} type="button" disabled={!value}>
                <X className="w-3 h-3" />
            </Button>
            <div className="w-[.05em] mx-2 bg-neutral-400 self-stretch" />
            <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => setIsOptionsEnabled((prev) => !prev)}
                type="button"
            >
                <ChevronDown className="w-3 h-3" />
            </Button>

            {isOptionsEnabled ? (
                <ul
                    className="absolute z-[60] border-[0.1em] p-1 border-neutral-400 rounded-sm bg-white  left-0 w-full max-h-36 overflow-y-auto"
                    style={{ top: "calc(100% + .5rem)" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {options.map((item) => {
                        const isSelected = value?.some((v) => v.id === item.id);
                        return (
                            <li
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(item);
                                }}
                                className={cn(
                                    `hover:bg-light-blue/50 px-1 cursor-pointer ${
                                        isSelected
                                            ? "bg-neutral-200 opacity-60 pointer-events-none cursor-not-allowed"
                                            : ""
                                    }`
                                )}
                            >
                                <span className="flex items-center gap-1  h-[2.5em]">
                                    <span>{item.name}</span>
                                    {/* <span>
                                    <Cross className="w-4 h-4" />
                                </span> */}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};
