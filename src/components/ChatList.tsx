import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { UserSearch } from './UserSearch';
import { ChatPreview } from './ChatPreview';

export const ChatList: React.FC = () => {
  const { chats, activeChat, setActiveChat } = useChatStore();
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="w-80 border-r border-gray-200 h-full flex flex-col">
      <UserSearch />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <ChatPreview
              key={chat.id}
              chat={chat}
              currentUserId={user.id}
              isActive={chat.id === activeChat}
              onClick={() => setActiveChat(chat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};