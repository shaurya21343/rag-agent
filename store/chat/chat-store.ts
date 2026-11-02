import { create } from "zustand";

interface ChatStore {
	activeChatId: string | null;
	setActiveChatId: (chatId: string | null) => void;
	clearActiveChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
	activeChatId: null,
	setActiveChatId: (activeChatId) => set({ activeChatId }),
	clearActiveChat: () => set({ activeChatId: null }),
}));
