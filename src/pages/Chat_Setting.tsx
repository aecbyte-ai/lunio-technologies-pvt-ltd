import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Bell, 
  ChevronDown, 
  ChevronRight, 
  Edit3, 
  X,
  User,
  MessageSquare,
  Zap,
  BellRing,
  Tag,
  UserX,
  Users,
  Plus,
  Trash2,
  MoreHorizontal,
  ChevronLeft
} from 'lucide-react';
import UserManagement from '../components/AdminManagement';
import QuickReply from '../components/QuickReply';
import AutoReply from '../components/AutoReply';
import Notification from '../components/Notification';
import KeywordTag from '../components/KeywordTag';
import BlacklistKeyword from '../components/BlacklistKeyword';
import AgentStatus from '../components/AgentStatus';

const Chat_Setting = () => {

  const [activeTab, setActiveTab] = useState('User Management');


    const tabs = [
    { name: 'User Management', icon: User, active: true },
    { name: 'Quick Reply', icon: MessageSquare, active: false },
    { name: 'Auto Reply', icon: Zap, active: false },
    { name: 'Notification', icon: BellRing, active: false },
    { name: 'Keyword Tag', icon: Tag, active: false },
    { name: 'Blacklist Keywords', icon: UserX, active: false },
    { name: 'Agent Status', icon: Users, active: false }
  ];

  

    const renderTabContent = () => {
    switch (activeTab) {
      case 'User Management':
        return <UserManagement />;
      case 'Quick Reply':
        return <QuickReply />;
      case 'Auto Reply':
        return <AutoReply />;
      case 'Notification':
        return <Notification />;
      case 'Keyword Tag':
        return <KeywordTag />;
      case 'Blacklist Keywords':
        return <BlacklistKeyword />;
      case 'Agent Status':
        return <AgentStatus />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
            <main className="flex-1 p-8">

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Chat Setting</h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.name
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </main>
        </div>
      </div>
  )
}

export default Chat_Setting