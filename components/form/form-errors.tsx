import { XCircle } from "lucide-react";
import { FieldErrors } from "react-hook-form";

import { ShieldAlert } from "lucide-react";

interface FormErrorProps {
    message?: string;
}

export const FormErrors = ({ message }: FormErrorProps) => {
    if (!message) {
        return null;
    }

    return (
        <div className="bg-destructive/10 p-3 rounded-md flex items-center justify-start gap-x-2 text-sm text-destructive">
            <ShieldAlert className="w-4 h-4" />
            <p className="">{message}</p>
        </div>
    );
};
