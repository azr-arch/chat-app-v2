"use client";

import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import axios from "axios";

export const Upload = ({ chatId }: { chatId: string }) => {
    const onUpload = async (results: CldUploadWidgetResults) => {
        if (!results || !results?.info?.url) return;

        console.log({ results });

        try {
            const res = await axios.post(`/api/chat/${chatId}/message`, {
                image: results.info.url,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <CldUploadWidget
                onUpload={onUpload}
                options={{ multiple: true, sources: ["local"] }}
                uploadPreset="qxjrxlga"
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button size={"sm"} variant={"outline"} onClick={onClick}>
                            <PlusCircle className="w-4 h-4" />
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};
