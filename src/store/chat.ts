import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Chat {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

interface ChatStore {
  chats: Chat[];
  addChat: (chat: Omit<Chat, "createdAt" | "updatedAt">) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newName: string) => void;
  getChat: (chatId: string) => Chat | undefined;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],

      addChat: (chat) => {
        const newChat: Chat = {
          ...chat,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          chats: [...state.chats, newChat],
        }));
      },

      deleteChat: (chatId) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
        }));
      },

      renameChat: (chatId, newName) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, name: newName, updatedAt: Date.now() }
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
      partialize: (state) => ({ chats: state.chats }),
    }
  )
);
