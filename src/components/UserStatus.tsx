import React from 'react';
import { User } from '../types';

interface UserStatusProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

export const UserStatus: React.FC<UserStatusProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const statusDotClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div className="relative inline-block">
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white`}
      />
      <span
        className={`absolute bottom-0 right-0 block ${
          statusDotClasses[size]
        } rounded-full ring-2 ring-white ${
          user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
        }`}
      />
    </div>
  );
};