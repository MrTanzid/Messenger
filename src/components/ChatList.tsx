import React from 'react';
import { format } from 'date-fns';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

export const ChatList: React.FC = () => {
  const { chats, activeChat, setActiveChat } = useChatStore();
  const { user } = useAuthStore();

  return (
    <div className="w-80 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {chats.map((chat) => {
          const otherParticipant = chat.participants.find((p) => p.id !== user?.id);
          return (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 ${
                activeChat === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={otherParticipant?.avatar}
                  alt={otherParticipant?.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {otherParticipant?.name}
                    </p>
                    {chat.lastMessage && (
                      <p className="text-xs text-gray-500">
                        {format(chat.lastMessage.timestamp, 'HH:mm')}
                      </p>
                    )}
                  </div>
                  {chat.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};