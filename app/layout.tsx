import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { AuthContext } from "@/context/auth-context";

import TopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chatly",
    description: "Realtime chat application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TopLoader color="#000" height={10} />
                <AuthContext>
                    <Toaster />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
