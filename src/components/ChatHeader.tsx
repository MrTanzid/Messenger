import React, { useState } from 'react';
import { MoreVertical, Phone, Video, Trash2, UserPlus } from 'lucide-react';
import { User } from '../types';
import { UserStatus } from './UserStatus';
import { useChatStore } from '../store/useChatStore';

interface ChatHeaderProps {
  participant: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeChat, deleteChat } = useChatStore();

  const handleDeleteChat = () => {
    if (!activeChat) return;
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      deleteChat(activeChat);
    }
    setShowMenu(false);
  };

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center space-x-3">
        <UserStatus user={participant} />
        <div>
          <h2 className="text-lg font-semibold">{participant.name}</h2>
          <p className="text-sm text-gray-500">
            {participant.status === 'online' ? 'Active now' : 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <UserPlus className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleDeleteChat}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete conversation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};