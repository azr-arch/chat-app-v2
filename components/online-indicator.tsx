import { cn } from "@/lib/utils";

export const OnlineIndicator = ({ className }: { className?: string }) => {
    return (
        <span
            className={cn(
                `bg-main rounded-full absolute -bottom-[2px] -right-[2px] z-50 w-3 h-3 flex items-center justify-center`,
                className
            )}
        >
            <span className="w-2 h-2 bg-green-500 rounded-full "></span>
        </span>
    );
};
