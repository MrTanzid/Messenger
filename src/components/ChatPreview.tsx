import React from 'react';
import { format } from 'date-fns';
import { Chat, User } from '../types';
import { UserStatus } from './UserStatus';

interface ChatPreviewProps {
  chat: Chat;
  currentUserId: string;
  isActive: boolean;
  onClick: () => void;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  chat,
  currentUserId,
  isActive,
  onClick,
}) => {
  const otherParticipant = chat.participants.find((p) => p.id !== currentUserId);

  if (!otherParticipant) return null;

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
        isActive ? 'bg-gray-100' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <UserStatus user={otherParticipant} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 truncate">
              {otherParticipant.name}
            </p>
            {chat.lastMessage && (
              <p className="text-xs text-gray-500">
                {format(chat.lastMessage.timestamp, 'HH:mm')}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500">@{otherParticipant.username}</p>
          {chat.lastMessage && (
            <p className="text-sm text-gray-500 truncate">
              {chat.lastMessage.content}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};