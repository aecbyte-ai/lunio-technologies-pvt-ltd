import React from 'react';
import { Trash2 } from 'lucide-react';

const BlacklistKeyword = () => {
  return (
   <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Blacklist Keyword</h2>
        <p className="text-sm text-gray-500 mb-6">
          Set keywords that can be blocked in IM Chat.
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter keyword to blacklist"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlacklistKeyword