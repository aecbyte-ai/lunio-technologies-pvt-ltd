import React, { useState } from 'react';
import { Calendar, Info, Download } from 'lucide-react';
// import IncomeChart from '../components/IncomeChart';
import OrdersTable from './OrdersTable';

const IncomeOverview: React.FC = () => {
  const [selectedReleaseTab, setSelectedReleaseTab] = useState('to-release');

  return (
    <div className="space-y-6">


      {/* Income Overview Section */}
      <div className="bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Income Overview</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* To Release Card */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-600">To Release</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600">NPR 9,845.48</div>
              <div className="text-sm text-gray-500 flex items-center">
                To be released on 18 Aug 2025
                <Info className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Released Card with Chart */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-600">Released</h3>
              <span className="text-xs text-gray-400">💰</span>
            </div>
            <div className="mb-4">
              <div className="text-lg font-bold text-indigo-600 mb-2">NPR 9,845.48</div>
            </div>
            
            {/* Mini Chart */}
            <div className="h-32">
              <svg className="w-full h-full" viewBox="0 0 300 120">
                {/* Grid lines */}
                {[0, 30, 60, 90, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="300"
                    y2={y}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Chart line */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  points="0,90 75,60 150,45 225,30 300,75"
                />
                
                {/* Data points */}
                {[
                  { x: 0, y: 90 },
                  { x: 75, y: 60 },
                  { x: 150, y: 45 },
                  { x: 225, y: 30 },
                  { x: 300, y: 75 }
                ].map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>23 Jul 2025</span>
                <span>07 Jul 2025</span>
                <span>21 Jul 2025</span>
                <span>04 Aug 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Release Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedReleaseTab('to-release')}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedReleaseTab === 'to-release'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              To Release
            </button>
            <button
              onClick={() => setSelectedReleaseTab('released')}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedReleaseTab === 'released'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Released
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Creation Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="End Date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option>Please Select</option>
                <option>Ready to Release</option>
                <option>Released</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
              <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-150">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <input
                type="text"
                placeholder="Order No/Order ID"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
              />
            </div>
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150 shadow-sm">
                <span>Download</span>
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <OrdersTable />

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Total 4</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>items per page</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Previous</button>
              <button className="w-8 h-8 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 transition-colors">1</button>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeOverview;