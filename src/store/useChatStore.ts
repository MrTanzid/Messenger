import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Message, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  startNewChat: (currentUser: User, otherUser: User) => void;
  deleteChat: (chatId: string) => void;
  markMessageAsRead: (chatId: string, messageId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
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
      startNewChat: (currentUser, otherUser) =>
        set((state) => {
          const existingChat = state.chats.find((chat) =>
            chat.participants.some((p) => p.id === otherUser.id)
          );

          if (existingChat) {
            return { activeChat: existingChat.id };
          }

          const newChat: Chat = {
            id: uuidv4(),
            participants: [currentUser, otherUser],
            messages: [],
          };

          return {
            chats: [...state.chats, newChat],
            activeChat: newChat.id,
          };
        }),
      deleteChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          activeChat: state.activeChat === chatId ? null : state.activeChat,
        })),
      markMessageAsRead: (chatId, messageId) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, read: true } : msg
                  ),
                }
              : chat
          ),
        })),
    }),
    {
      name: 'chat-storage',
    }
  )
);