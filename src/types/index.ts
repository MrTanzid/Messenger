export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  bio?: string;
  email?: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  attachments?: FileAttachment[];
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
}