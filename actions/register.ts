"use server";

import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma-db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const register = async (values: FormData) => {
    const name = values.get("name") as string;
    const email = values.get("email") as string;

    // Check if a user is already registered with given email
    const userExists = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (userExists) {
        return {
            error: true,
            message: "Email is already registered!",
        };
    }

    const password = values.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 12);

    const profilePicture = values.get("profilePicture") as File;

    const arrayBuffer = await profilePicture.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    try {
        const fileRes = await new Promise((resolve, reject) =>
            cloudinary.uploader
                .upload_stream({}, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                        return;
                    }
                    resolve(result);
                })
                .end(buffer)
        );

        if (!fileRes?.secure_url) {
            return null;
        }

        await db.user.create({
            data: {
                email,
                hashedPassword,
                name,
                image: fileRes.secure_url,
            },
        });

        console.log("Registered successfully");
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Something went wrong",
        };
    }

    revalidatePath("/");
};
