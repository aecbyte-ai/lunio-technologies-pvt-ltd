import React from 'react'

const AgentStatus = () => {
  return (
  <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Agent Status</h2>
        <p className="text-sm text-gray-500 mb-6">
          Keep track of all agent's status here. You can transfer all the unresolved chats through the transfer button below.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Account</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Waiting Customers</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">KMMR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-900">awesomemail.com.np</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-900">Desktop: Online</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-4 mr-2"></span>
                    <span className="text-sm text-gray-900">Mobile: Offline</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">0</td>
                <td className="py-3 px-4 text-sm text-gray-900">--</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                    Transfer
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

export default AgentStatus