import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (session?.user) {
        return redirect("/chats");
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
            {children}
        </div>
    );
};

export default AuthLayout;
