import Image from "next/image";
import Link from "next/link";

export const Logo = ({ width, height }: { width: number; height: number }) => {
    return (
        <Link href={"/chats"}>
            <div className="hover:opacity-70 transition flex items-center justify-center">
                <Image src={"/logo.svg"} width={width} height={height} alt="logo" />
            </div>
        </Link>
    );
};
