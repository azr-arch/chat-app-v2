import { Logo } from "@/components/logo";
import { AuthForm } from "./components/auth-form";
import { LandingPage } from "@/components/landing-page";

const AuthPage = () => {
    return (
        <div className="flex flex-col justify-center max-w-sm w-full pb-10">
            <AuthForm />
        </div>
        // Todo Implement
        // <LandingPage />
    );
};

export default AuthPage;
