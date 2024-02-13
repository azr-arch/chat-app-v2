import { User } from "@prisma/client";

interface SidebarHeaderProps {
    data: User;
}

export const SidebarHeader = ({ data }: SidebarHeaderProps) => {
    return (
        <div className="w-full px-6 py-3 flex items-center">
            <p className="text-black font-semibold text-lg">{data.name}</p>
        </div>
    );
};
