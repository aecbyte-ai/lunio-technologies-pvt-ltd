import React, { useState } from 'react';
import { 
  Edit3, 
} from 'lucide-react';

const AdminManagement = () => {

      const [weekdayStart, setWeekdayStart] = useState('10:00');
      const [weekdayEnd, setWeekdayEnd] = useState('18:00');
      const [weekendStart, setWeekendStart] = useState('10:00');
      const [weekendEnd, setWeekendEnd] = useState('18:30');
      const [allowOffer, setAllowOffer] = useState(false);
  return (
    <div className="space-y-6">
      {/* Working Hours Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">On Weekday</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  value={weekdayStart}
                  onChange={(e) => setWeekdayStart(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-500">to</span>
                <input
                  type="time"
                  value={weekdayEnd}
                  onChange={(e) => setWeekdayEnd(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">On Weekend</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  value={weekendStart}
                  onChange={(e) => setWeekendStart(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-500">to</span>
                <input
                  type="time"
                  value={weekendEnd}
                  onChange={(e) => setWeekendEnd(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Setting Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Offer Setting</h2>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowOffer"
            checked={allowOffer}
            onChange={(e) => setAllowOffer(e.target.checked)}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="allowOffer" className="ml-2 text-sm text-gray-700">
            Allow buyers to make an offer
          </label>
        </div>
      </div>

      {/* Message Allocation Setting Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Message Allocation Setting</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Assign Messages to Admin</h3>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Admin Account Email:</span> lumio.nap@gmail.com
            </p>
            <p className="text-sm text-gray-500">
              When disabled, the Admin can also receive and reply to incoming messages.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Assign Messages by Capacity</h3>
            <p className="text-sm text-gray-500 mb-3">
              Enable to assign messages to Reps agents according to their Capacity. The higher the capacity level, the more conversations will be assigned. If disabled, messages will be allocated equally.
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">0 selected.</span>
              <button className="text-blue-600 hover:text-blue-800 transition-colors ml-1">Remove</button>
              <button className="text-blue-600 hover:text-blue-800 transition-colors ml-2">Change Capacity</button>
              <span className="ml-2">🔒</span>
            </p>
          </div>
        </div>
      </div>

      {/* User Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Email, User Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Account Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Capacity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-900">lumio.nap@gmail.com</span>
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Admin</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">awesomemail.com.ru</td>
                <td className="py-3 px-4">
                  <span className="text-sm text-red-500">Not Configured</span>
                  <span className="ml-1">🔒</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminManagement