import React from 'react'

const Notification = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Ringtone (when receiving a message)</h3>
              <div className="flex items-center mt-1">
                <input type="radio" name="ringtone" className="mr-2" />
                <span className="text-sm text-gray-600">Off</span>
                <input type="radio" name="ringtone" className="ml-4 mr-2" defaultChecked />
                <span className="text-sm text-gray-600">On</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Strong Alert</h3>
              <div className="flex items-center mt-1">
                <input type="radio" name="emailAlert" className="mr-2" />
                <span className="text-sm text-gray-600">Off</span>
                <input type="radio" name="emailAlert" className="ml-4 mr-2" />
                <span className="text-sm text-gray-600">On</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification