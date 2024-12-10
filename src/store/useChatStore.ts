import { create } from 'zustand';
import type { Chat, Message } from '../types';

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChat: null,
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message,
            }
          : chat
      ),
    })),
}));