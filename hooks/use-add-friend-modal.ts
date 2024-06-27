import { create } from "zustand";

type Type = "group" | "private";

type AddFriendModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const useAddFriendModal = create<AddFriendModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
