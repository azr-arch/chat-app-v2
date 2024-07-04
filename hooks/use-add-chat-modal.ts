import { create } from "zustand";

type Type = "group" | "private";

type AddChatModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const useAddChatModal = create<AddChatModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
