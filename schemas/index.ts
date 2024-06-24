import { SelectOptions } from "@/lib/types";
import { User } from "@prisma/client";
import * as z from "zod";

const MAX_FILE_SIZE = 4; // In Megabytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
    const result = sizeInBytes / (1024 * 1024);
    return +result.toFixed(decimalsNum);
};

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
        .string({
            invalid_type_error: "Password does not match",
        })
        .min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: "Username cannot be empty" }),
    email: z
        .string({ invalid_type_error: "Invalid email" })
        .email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Mininum 6 characters required" }),
    profilePicture: z
        .custom<FileList>()
        .refine((files) => {
            return Array.from(files ?? []).length !== 0;
        }, "Profile photo is required")
        .refine((files) => {
            return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_FILE_SIZE);
        }, `The maximum image size is ${MAX_FILE_SIZE}MB`)
        .refine((files) => {
            return Array.from(files ?? []).every((file) =>
                ACCEPTED_IMAGE_TYPES.includes(file.type)
            );
        }, "File type is not supported"),
});

const MemberInfoSchema = z.object({
    name: z.string(),
    image: z.string(),
    email: z.string(),
});

export const CreateGroupSchema = z.object({
    name: z.string().min(1, { message: "Group name cannot be empty" }),
    members: z.array(MemberInfoSchema).min(1, "Minimum 1 person is required"),
});
