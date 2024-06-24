"use client";

import { ActionState } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

type Action<TInput extends FieldValues, TOutput> = (
    data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseSafeActionProps<TOutput> {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
}

export const useSafeAction = <TInput extends FieldValues, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseSafeActionProps<TOutput> = {}
) => {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined);
    const [errors, setErrors] = useState<string | undefined>(undefined);
    const [data, setData] = useState<TOutput | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(
        async (input: TInput) => {
            setIsLoading(true);

            try {
                const result = await action(input);

                if (!result) {
                    return;
                }

                setFieldErrors?.(result.fieldErrors);

                if (result.error) {
                    setErrors(result.error);
                    options.onError?.(result.error);
                }

                if (result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                }
            } finally {
                setIsLoading(false);
                options.onComplete?.();
            }
        },
        [action, options]
    );

    return {
        execute,
        fieldErrors,
        errors,
        data,
        isLoading,
    };
};
