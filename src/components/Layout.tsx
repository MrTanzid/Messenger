import React from 'react';
import { MessageCircle, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-20 border-r border-gray-200 flex flex-col items-center py-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-8">
          <MessageCircle className="w-6 h-6" />
        </div>

        <Link
          to="/profile"
          className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <User className="w-6 h-6" />
        </Link>
        
        <div className="mt-auto">
          <button
            onClick={handleLogout}
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