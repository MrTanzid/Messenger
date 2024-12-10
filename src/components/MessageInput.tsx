import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import type { FileAttachment } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface MessageFormData {
  message: string;
}

export const MessageInput: React.FC = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<MessageFormData>();
  const { addMessage, activeChat } = useChatStore();
  const { user } = useAuthStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageContent = watch('message', '');

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue('message', (messageContent || '') + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newAttachments: FileAttachment[] = [];

    for (const file of files) {
      // In a real app, you would upload the file to a server here
      // For now, we'll create a local URL
      const attachment: FileAttachment = {
        id: uuidv4(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      newAttachments.push(attachment);
    }

    setAttachments((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== attachmentId));
  };

  const onSubmit = (data: MessageFormData) => {
    if (!user || !activeChat || (!data.message.trim() && attachments.length === 0)) return;

    addMessage(activeChat, {
      id: uuidv4(),
      senderId: user.id,
      content: data.message,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    reset();
    setAttachments([]);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      {attachments.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
            >
              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
              <button
                onClick={() => removeAttachment(file.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Smile className="w-5 h-5" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            {...register('message')}
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </form>
    </div>
  );
};