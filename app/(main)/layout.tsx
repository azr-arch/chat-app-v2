import { Header } from "./components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            {children}
        </div>
    );
};

export default MainLayout;
