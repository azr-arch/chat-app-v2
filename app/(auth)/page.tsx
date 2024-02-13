import { Logo } from "@/components/logo";
import { AuthForm } from "./components/auth-form";
import Image from "next/image";

const AuthPage = () => {
    return (
        <div className="flex flex-col justify-center max-w-sm w-full">
            <div className="sm:mx-auto  sm:max-w-md">
                <div className="flex items-center justify-center">
                    <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
                </div>
                <h2 className="mt-4 text-2xl text-gray-900 font-bold text-center">
                    Welcome, back!
                </h2>
            </div>
            <AuthForm />
        </div>
    );
};

export default AuthPage;
