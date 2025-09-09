import React, { useState } from 'react';
import IncomeOverview from '../components/Income_overview';
import IncomeStatement from '../components/IncomeStatement';
import IncomeDetails from '../components/IncomeDetails';

const MyIncome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReleaseTab, setSelectedReleaseTab] = useState('to-release');

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Income</h1>
        <div className="mt-4 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Income Overview' },
              { key: 'statement', label: 'Income Statement' },
              { key: 'details', label: 'Income Details' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 text-blue-400 border border-blue-400 rounded-full flex items-center justify-center">
              <span className="text-xs">i</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Dear Seller, please note that there may be a system delay affecting the automated updates of your seller statement. If you notice that your statement is not up to date, kindly reach out to our Partner Support Team for assistance.{' '}
              <a href="#" className="text-blue-600 underline">Contact PSC</a>
            </p>
          </div>
        </div>
      </div>

      {/* Income Overview */}
      {activeTab === 'overview' && (
        <IncomeOverview />
      )}

      {activeTab === 'statement' && (
        <IncomeStatement />
      )}

      {activeTab === 'details' && (
        <IncomeDetails />
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 py-6 border-t border-gray-200 mt-8">
        <span>Lumino Technologies 2024. All rights reserved.</span>
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">Help Center</span>
      </div>
    </div>
  );
};

export default MyIncome;