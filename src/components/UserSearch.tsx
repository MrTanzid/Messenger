import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { User } from '../types';
import { UserStatus } from './UserStatus';

export const UserSearch: React.FC = () => {
  const { searchQuery, setSearchQuery, searchUsers } = useUserStore();
  const { startNewChat } = useChatStore();
  const { user: currentUser } = useAuthStore();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const searchResults = searchUsers();

  const handleStartChat = (otherUser: User) => {
    if (!currentUser) return;
    startNewChat(currentUser, otherUser);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users... (⌘K)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="absolute z-10 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <button
                key={user.id}
                onClick={() => handleStartChat(user)}
                className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <UserStatus user={user} size="sm" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  {user.bio && (
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {user.bio}
                    </p>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};