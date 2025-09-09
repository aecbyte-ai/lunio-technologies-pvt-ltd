import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const NotificationCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Important Notification</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
          More →
        </button>
      </div>
      
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">New Order</h3>
          <p className="text-sm text-gray-500">You've got a new order</p>
        </div>
        <div className="text-xs text-gray-400">yesterday</div>
      </div>
    </div>
  );
};