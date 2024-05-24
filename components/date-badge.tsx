import moment from "moment";

interface DateBadgeProps {
    time: Date;
}

export const DateBadge = ({ time }: DateBadgeProps) => {
    return (
        <span className="text-[#535456] text-[10px] 2xl:text-xs font-medium mx-auto my-3">
            {moment(time).calendar(null, {
                sameDay: "[Today]",
                lastDay: "[Yesterday]",
                lastWeek: "dddd",
                sameElse: "D MMMM, YYYY",
            })}
        </span>
    );
};
