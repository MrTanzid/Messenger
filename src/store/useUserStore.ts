import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface UserState {
  users: User[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addUser: (user: User) => void;
  searchUsers: () => User[];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: '2',
          username: 'sarah_smith',
          name: 'Sarah Smith',
          avatar: 'https://source.unsplash.com/100x100/?portrait&sarah',
          status: 'online',
          bio: 'Photography enthusiast',
          email: 'sarah@example.com',
        },
        {
          id: '3',
          username: 'mike_jones',
          name: 'Mike Jones',
          avatar: 'https://source.unsplash.com/100x100/?portrait&mike',
          status: 'offline',
          bio: 'Software developer',
          email: 'mike@example.com',
        },
      ],
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      searchUsers: () => {
        const { users, searchQuery } = get();
        if (!searchQuery.trim()) return [];
        
        const query = searchQuery.toLowerCase();
        return users.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.name.toLowerCase().includes(query)
        );
      },
    }),
    {
      name: 'user-storage',
    }
  )
);