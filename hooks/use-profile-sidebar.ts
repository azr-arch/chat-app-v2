import { create } from "zustand";

type ProfileSidebarStore = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const useProfileSidebar = create<ProfileSidebarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
