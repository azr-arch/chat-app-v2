const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col max-w-screen-2xl m-auto 2xl:py-3">
            {/* <Header /> */}
            {children}
        </div>
    );
};

export default MainLayout;
