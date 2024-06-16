import Image from "next/image";
import { Button } from "./ui/button";

export const LandingPage = () => {
    return (
        <div className="bg-white w-full h-full">
            <header className="h-16 flex items-center px-4 border-b border-neutral-200">
                <div>Chatly</div>

                <div className="ml-auto space-x-4">
                    <Button variant={"default"}>Login</Button>
                    <Button variant={"outline"}>Create an account</Button>
                </div>
            </header>

            {/* Hero */}
            <div className="mt-8 px-8 bg-red-100 flex justify-center">
                <div className="relative w-full max-w-4xl  aspect-video bg-pink-200 flex items-center">
                    <Image
                        src={"/hero-bg.jpg"}
                        fill
                        alt="Group of people illustration"
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};
