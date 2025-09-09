import React from 'react';
import { Bell, Settings, User, Home, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  return (
     <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Home size={16} />
          <ChevronRight size={14} />
          <span>Products</span>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Manage Products</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};