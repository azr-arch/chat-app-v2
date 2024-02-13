"use client";

import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    placeholder: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

export const FormInput: React.FC<InputProps> = ({
    placeholder,
    id,
    register,
    required,
    errors,
    type = "text",
    disabled,
}) => {
    return (
        <div className="mt-2">
            <input
                id={id}
                type={type}
                autoComplete={id}
                placeholder={placeholder}
                disabled={disabled}
                {...register(id, { required })}
                className={cn(
                    `
                        w-full
                        py-1.5 
                        text-gray-900 
                        px-3
                        placeholder:text-neutral-500                
                        sm:text-sm 
                        sm:leading-6`,
                    errors[id] && "focus:ring-rose-500",
                    disabled && "opacity-50 cursor-default"
                )}
            />
        </div>
    );
};
