import { User } from "@prisma/client";

interface SidebarHeaderProps {
    data: User;
}

export const SidebarHeader = ({ data }: SidebarHeaderProps) => {
    return (
        <div className="w-full bg-beige px-6 h-16 flex items-center">
            {/* Profile */}
            <div className="w-10 h-10 rounded-full bg-black mr-4" />

            {/* Todo add options */}
        </div>
    );
};
