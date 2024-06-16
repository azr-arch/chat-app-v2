import { auth } from "@/auth";
import { db } from "./prisma-db";

export const currentUser = async (fullFetch: boolean = false) => {
    const session = await auth(); // Retrieve the user session

    if (!session?.user) {
        return null; // No user session found
    }

    const { user } = session;

    if (fullFetch) {
        // Fetch additional user details from your database
        // Example: Fetch user's profile image, full name, etc.
        // Replace with your actual database query
        const userDetails = await fetchUserDetails(user.email);

        // Return user data with additional details
        return userDetails;
    }

    // Return only basic user data (email and image)
    return user;
};

async function fetchUserDetails(email: string | null | undefined) {
    if (!email) return null;

    const data = await db.user.findUnique({
        where: {
            email,
        },
    });

    return data;
}
