import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner";
import { AuthContext } from "@/context/auth-context";

import TopLoader from "nextjs-toploader";

const poppins = Poppins({ weight: ["300", "500", "400", "600", "700"], subsets: ["latin"] });

// const myFont = localFont({
//     src: [
//         {
//             path: "../public/fonts/Araboto Black 400.ttf",
//             weight: "900",
//             style: "black",
//         },
//         {
//             path: "../public/fonts/Araboto Bold 400.ttf",
//             weight: "700",
//             style: "bold",
//         },
//         {
//             path: "../public/fonts/Araboto Light 400.ttf",
//             weight: "300",
//             style: "light",
//         },
//         {
//             path: "../public/fonts/Araboto Medium 400.ttf",
//             weight: "500",
//             style: "medium",
//         },
//         {
//             path: "../public/fonts/Araboto Normal 400.ttf",
//             weight: "400",
//             style: "normal",
//         },
//         {
//             path: "../public/fonts/Araboto Thin 400.ttf",
//             weight: "200",
//             style: "thin",
//         },
//     ],
// });

export const metadata: Metadata = {
    title: "Chatly",
    description: "Realtime chat application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <TopLoader color="#ffffff" height={1} zIndex={9999} showSpinner={false} />
                <AuthContext>
                    <Toaster />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
