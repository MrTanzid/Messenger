import React from 'react';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import { Message, FileAttachment } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const renderAttachment = (attachment: FileAttachment) => {
    if (attachment.type.startsWith('image/')) {
      return (
        <div className="mt-2">
          <img
            src={attachment.url}
            alt={attachment.name}
            className="max-w-[200px] rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(attachment.url, '_blank')}
          />
        </div>
      );
    }
    return (
      <a
        href={attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center space-x-2 text-blue-500 hover:text-blue-600"
      >
        <FileText className="w-4 h-4" />
        <span className="text-sm underline">{attachment.name}</span>
      </a>
    );
  };

  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isOwn
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {message.content && (
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        )}
        {message.attachments?.map((attachment) => (
          <div key={attachment.id}>{renderAttachment(attachment)}</div>
        ))}
        <p
          className={`text-xs mt-1 ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {format(message.timestamp, 'HH:mm')}
        </p>
      </div>
    </div>
  );
};