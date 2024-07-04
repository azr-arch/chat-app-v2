import { FieldErrors, FieldValues } from "react-hook-form";
import { z } from "zod";

export type ActionState<TInput extends FieldValues, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
};

// TODO: need rework
export const createSafeAction = <TInput extends FieldValues, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        // console.log("Schema Parse: ", schema.safeParse(data));
        // const validationResult = schema.safeParse(data);

        // if (!validationResult.success) {
        //     console.log(
        //         "Errors: ",
        //         validationResult.error.flatten().fieldErrors as FieldErrors<TInput>
        //     );
        //     return {
        //         fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
        //     };
        // }

        return handler(data);
    };
};
