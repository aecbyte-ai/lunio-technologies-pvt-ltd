import React, { useState } from 'react';
import { Mail, MessageSquare, Bell, Send, Users, Calendar, Target, Plus } from 'lucide-react';

export const CustomerCommunication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [messageType, setMessageType] = useState('email');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const tabs = [
    { id: 'compose', label: 'Compose Message' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'templates', label: 'Templates' },
    { id: 'history', label: 'Message History' },
  ];

  const segments = [
    { id: 'all', name: 'All Customers', count: 1247 },
    { id: 'high-value', name: 'High Value Customers', count: 156 },
    { id: 'new', name: 'New Customers', count: 89 },
    { id: 'dormant', name: 'Dormant Customers', count: 234 },
    { id: 'frequent', name: 'Frequent Buyers', count: 78 },
  ];

  const campaigns = [
    {
      id: '1',
      name: 'Welcome Series - New Customers',
      type: 'email',
      segment: 'New Customers',
      status: 'active',
      sent: 89,
      opened: 67,
      clicked: 23,
      createdAt: '2024-12-01',
    },
    {
      id: '2',
      name: 'Win-back Campaign - Dormant Users',
      type: 'email',
      segment: 'Dormant Customers',
      status: 'completed',
      sent: 234,
      opened: 156,
      clicked: 45,
      createdAt: '2024-11-15',
    },
    {
      id: '3',
      name: 'VIP Exclusive Offers',
      type: 'push',
      segment: 'High Value Customers',
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      createdAt: '2024-12-20',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Communication</h1>
        <p className="text-gray-600">Send targeted messages and manage communication campaigns</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Compose Message */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Compose New Message</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="email"
                          checked={messageType === 'email'}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="mr-2"
                        />
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="sms"
                          checked={messageType === 'sms'}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="mr-2"
                        />
                        <MessageSquare className="w-4 h-4 mr-1" />
                        SMS
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="push"
                          checked={messageType === 'push'}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="mr-2"
                        />
                        <Bell className="w-4 h-4 mr-1" />
                        Push
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Segment</label>
                    <select
                      value={selectedSegment}
                      onChange={(e) => setSelectedSegment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {segments.map((segment) => (
                        <option key={segment.id} value={segment.id}>
                          {segment.name} ({segment.count} customers)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                  <textarea
                    rows={8}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Schedule for later</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Track opens</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Save Draft
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview & Targeting</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">Target Audience</span>
                </div>
                <p className="text-sm text-gray-600">
                  {segments.find(s => s.id === selectedSegment)?.name}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {segments.find(s => s.id === selectedSegment)?.count} recipients
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Message Preview</h4>
                <div className="text-sm text-gray-600">
                  <p className="mb-2"><strong>Type:</strong> {messageType.toUpperCase()}</p>
                  <p className="mb-2"><strong>Subject:</strong> Your message subject will appear here</p>
                  <p><strong>Content:</strong> Your message content will be previewed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{campaign.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{campaign.type.toUpperCase()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{campaign.segment}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                      <p className="text-sm text-gray-600">Sent</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{campaign.opened}</p>
                      <p className="text-sm text-gray-600">Opened</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{campaign.clicked}</p>
                      <p className="text-sm text-gray-600">Clicked</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};