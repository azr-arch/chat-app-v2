"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant = "default",
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending || disabled}
            variant={variant}
            size="sm"
            className={cn(className)}
        >
            {children}
        </Button>
    );
};
