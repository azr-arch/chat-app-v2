import { z } from "zod";

export const SendMessage = z.object({
    chatId: z.string({
        required_error: "chatId is required",
    }),
    message: z.string(),
});
