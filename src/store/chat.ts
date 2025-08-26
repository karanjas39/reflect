import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Chat {
  id: string;
  imageDataUrl: string;
  prompt: string;
  style: string;
  createdAt: number;
  updatedAt: number;
}

interface ChatStore {
  chats: Chat[];
  storageUsed: number;
  maxStorage: number;
  addChat: (chat: Omit<Chat, "createdAt" | "updatedAt">) => Promise<boolean>;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newName: string) => void;
  getChat: (chatId: string) => Chat | undefined;
  calculateStorage: () => void;
  checkStorageLimit: () => boolean;
}

function calculateBase64Size(base64String: string): number {
  const base64Data = base64String.split(",")[1] || base64String;
  return Math.ceil((base64Data.length * 3) / 4);
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      storageUsed: 0,
      maxStorage: 3 * 1024 * 1024,
      canAddMoreImages: true,

      calculateStorage: () => {
        const { chats } = get();
        let totalSize = 0;

        chats.forEach((chat) => {
          if (chat.imageDataUrl) {
            totalSize += calculateBase64Size(chat.imageDataUrl);
          }
        });

        set({ storageUsed: totalSize });
      },

      checkStorageLimit: () => {
        const { storageUsed, maxStorage } = get();
        const canAdd = storageUsed < maxStorage;
        return canAdd;
      },

      addChat: async (chat) => {
        const newImageSize = calculateBase64Size(chat.imageDataUrl);
        const { storageUsed, maxStorage } = get();

        if (storageUsed + newImageSize > maxStorage) {
          return false;
        }

        const newChat: Chat = {
          ...chat,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          chats: [...state.chats, newChat],
          storageUsed: state.storageUsed + newImageSize,
        }));

        get().checkStorageLimit();
        return true;
      },

      deleteChat: (chatId) => {
        const { chats } = get();
        const chatToDelete = chats.find((chat) => chat.id === chatId);

        if (chatToDelete) {
          const deletedImageSize = calculateBase64Size(
            chatToDelete.imageDataUrl
          );

          set((state) => ({
            chats: state.chats.filter((chat) => chat.id !== chatId),
            storageUsed: Math.max(0, state.storageUsed - deletedImageSize),
          }));

          get().calculateStorage();
          get().checkStorageLimit();
        }
      },

      renameChat: (chatId, newName) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, prompt: newName, updatedAt: Date.now() }
              : chat
          ),
        }));
      },

      getChat: (chatId) => {
        return get().chats.find((chat) => chat.id === chatId);
      },
    }),
    {
      name: "reflect-chats",
      version: 1,
      partialize: (state) => ({
        chats: state.chats,
        storageUsed: state.storageUsed,
        maxStorage: state.maxStorage,
      }),
    }
  )
);
