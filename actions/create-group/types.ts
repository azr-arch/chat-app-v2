import { ActionState } from "@/lib/create-safe-action";
import { CreateGroupSchema } from "@/schemas";
import { Chat } from "@prisma/client";
import { z } from "zod";

export type InputType = z.infer<typeof CreateGroupSchema>;
export type ReturnType = ActionState<InputType, Chat>;
