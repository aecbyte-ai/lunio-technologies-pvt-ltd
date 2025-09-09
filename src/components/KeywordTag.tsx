import React from 'react'

const KeywordTag = () => {
  return (
     <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Keyword Settings</h2>
        <p className="text-sm text-gray-500 mb-6">
          You can add up to 25 keywords which buyers can click on to search sub-replies.
        </p>

        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Keyword List</h3>
          <p className="text-sm text-gray-500 mb-4">
            You can create up to 25 keywords. However, you can only select up to 5 keywords for each scenario (pre-category sale).
          </p>
          
          <div className="flex justify-between items-center mb-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
              See how it works in buyers
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
              Add keywords
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Keywords</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Responses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Scenarios</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">Become Follower</td>
                  <td className="py-3 px-4 text-sm text-gray-900">-</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Pre-Sale</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded ml-1">Post-Sale</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordTag