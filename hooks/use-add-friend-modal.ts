import { create } from "zustand";

type Type = "group" | "private";

type AddFriendModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: (type: Type) => void;
    type: Type;
};

export const useAddFriendModal = create<AddFriendModalProps>((set) => ({
    isOpen: false,
    onOpen: (type: Type) => set({ isOpen: true, type }),
    onClose: () => set({ isOpen: false, type: "private" }),
    type: "private",
}));
