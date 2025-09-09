import React, { useState } from 'react';
import { CustomerDirectory } from '../components/CustomerDirectory';
// import { CustomerProfile } from '../components/CustomerProfile';
import { CustomerAnalytics } from '../components/CustomerAnalytics';
import { CustomerSupport } from '../components/CustomerSupport';
import { CustomerCommunication } from '../components/CustomerCommunication';

type CustomerView = 'directory' | 'profile' | 'analytics' | 'support' | 'communication';

interface CustomerManagementProps {
  initialView?: string;
}

export const Customer: React.FC<CustomerManagementProps> = ({ initialView }) => {
  const [currentView, setCurrentView] = useState<CustomerView>('directory');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  React.useEffect(() => {
    if (initialView) {
      switch (initialView) {
        case 'customers-directory':
          setCurrentView('directory');
          break;
        case 'customers-analytics':
          setCurrentView('analytics');
          break;
        case 'customers-support':
          setCurrentView('support');
          break;
        case 'customers-communication':
          setCurrentView('communication');
          break;
        default:
          setCurrentView('directory');
      }
    }
  }, [initialView]);

  const handleViewCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentView('profile');
  };

//   const handleBackToDirectory = () => {
//     setCurrentView('directory');
//     setSelectedCustomerId('');
//   };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'directory':
        return <CustomerDirectory onViewCustomer={handleViewCustomer} />;
      case 'analytics':
        return <CustomerAnalytics />;
      case 'support':
        return <CustomerSupport />;
      case 'communication':
        return <CustomerCommunication />;
      default:
        return <CustomerDirectory />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      {currentView !== 'profile' && (
        <div className="bg-white border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'directory', label: 'Customer Directory' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'support', label: 'Support' },
              { id: 'communication', label: 'Communication' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as CustomerView)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentView === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Content */}
      {renderCurrentView()}
    </div>
  );
};