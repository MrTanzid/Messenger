import React from 'react';
import { MessageCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex h-screen bg-white">
      <div className="w-20 border-r border-gray-200 flex flex-col items-center py-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-8">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        <div className="mt-auto">
          <button
            onClick={logout}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {children}
      </div>
    </div>
  );
};