import React from 'react';
import { format } from 'date-fns';
import { Send, FileText } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { MessageInput } from './MessageInput';
import type { FileAttachment } from '../types';

export const ChatWindow: React.FC = () => {
  const { chats, activeChat } = useChatStore();
  const { user } = useAuthStore();
  
  const currentChat = chats.find((chat) => chat.id === activeChat);
  const otherParticipant = currentChat?.participants.find((p) => p.id !== user?.id);

  const renderAttachment = (attachment: FileAttachment) => {
    if (attachment.type.startsWith('image/')) {
      return (
        <img
          src={attachment.url}
          alt={attachment.name}
          className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
        />
      );
    }
    return (
      <a
        href={attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
      >
        <FileText className="w-4 h-4" />
        <span className="text-sm underline">{attachment.name}</span>
      </a>
    );
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={otherParticipant?.avatar}
            alt={otherParticipant?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{otherParticipant?.name}</h2>
            <p className="text-sm text-gray-500">
              {otherParticipant?.status === 'online' ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChat.messages.map((message) => {
          const isOwn = message.senderId === user?.id;
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content && <p className="text-sm">{message.content}</p>}
                {message.attachments && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id}>{renderAttachment(attachment)}</div>
                    ))}
                  </div>
                )}
                <p className="text-xs mt-1 opacity-70">
                  {format(message.timestamp, 'HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};