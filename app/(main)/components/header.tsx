import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Logout } from "../../../components/logout";

export const Header = () => {
    return (
        <header className="w-full h-16 px-8  flex items-center border-b border-black justify-between">
            <Logo width={32} height={32} />

            <Logout />
        </header>
    );
};
