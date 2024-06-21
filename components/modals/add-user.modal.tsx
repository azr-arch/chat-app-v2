"use client";

import { useAddFriendModal } from "@/hooks/use-add-friend-modal";
import { Modal } from "../ui/modal";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addFriendHandler } from "@/actions/add-friend";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Search, X } from "lucide-react";
import { getUserByEmail } from "@/actions/get-user-by-email";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Todo add zod + react hook form for validation
export const AddUserModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onClose } = useAddFriendModal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [searchResult, setSearchResult] = useState<null | User>(null);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const onMessage = async (email: string) => {
        setLoading(true);

        try {
            const res = await addFriendHandler({ email });
            console.log({ res });
            if (res?.error) {
                toast.error(res.error);
                return;
            }

            if (res?.data) {
                toast.success("Friend added succesfully");
                onClose();
                router.refresh();
                return;
            }
        } catch (error) {
            toast.error("Server Error");
            return;
        } finally {
            setLoading(false);
        }
    };

    const onSearch = async (formData: FormData) => {
        const email = formData.get("email") as string;
        setLoading(true);

        try {
            const res = await getUserByEmail({ email });
            if (res?.error) {
                setError(res?.message);
            }

            if (res?.data) {
                setSearchResult(res.data);
            }
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        if (error) {
            setError(null);
        }
    };

    return (
        <div
            data-state={isOpen}
            className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center bg-black/80 justify-center data-[state=true]:opacity-100 data-[state=false]:opacity-0 data-[state=false]:-z-10 transition-all duration-200 ease-in-out"
        >
            <div className="w-[90%] h-[90%] aspect-video bg-white rounded-2xl p-10 relative">
                <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50"
                    size={"icon"}
                    variant={"ghost"}
                >
                    <X className="w-4 h-4" />
                </Button>

                <div className="space-y-2 h-full ">
                    <h1 className="text-light-black-2 font-bold text-2xl">
                        Find and chat with friends
                    </h1>

                    <form
                        action={onSearch}
                        onChange={clearError}
                        className="w-full flex items-center gap-x-3 "
                    >
                        <Input
                            name="email"
                            type="email"
                            required
                            // TODO feat search user with user's name
                            placeholder="Your friend's email here"
                            className="placeholder:text-xs bg-neutral-100 h-9 placeholder:text-neutral-500 font-medium placeholder:opacity-80"
                            disabled={loading}
                        />
                        <Button size="sm" variant={"outline"} disabled={loading}>
                            <Search className="w-5 h-5" />
                        </Button>
                    </form>

                    <div className="w-full h-[90%] pt-8">
                        <ul className="w-full flex flex-col items-start">
                            {searchResult ? (
                                <li className="w-full">
                                    <div className="w-full flex items-center gap-x-4">
                                        <Image
                                            src={searchResult?.image || ""}
                                            alt={"User Avatar"}
                                            height={50}
                                            width={50}
                                            className="rounded-full shadow-sm"
                                        />

                                        <div className="space-y-1">
                                            <p className="text-light-black font-medium ">
                                                {searchResult.name}
                                            </p>
                                            <span className="text-sm text-neutral-500">
                                                {searchResult.email}
                                            </span>
                                        </div>
                                        <Button
                                            className="ml-auto"
                                            variant={"secondary"}
                                            onClick={() => onMessage(searchResult.email as string)}
                                            disabled={loading}
                                        >
                                            Message
                                        </Button>
                                    </div>
                                </li>
                            ) : (
                                <span className="absolute top-1/2 text-neutral-600 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center">
                                    No friends found. Try adjusting your search or invite friends to
                                    join!
                                </span>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
