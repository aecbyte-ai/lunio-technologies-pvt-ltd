import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsCharts = () => {
  const [selectedChart, setSelectedChart] = useState('revenue');

  // Sample data based on the dashboard (August 7 - September 5, 2025)
  const data = [
    { date: '08-07', revenue: 0, visitors: 45, orders: 0, newCustomers: 0, pageviews: 180 },
    { date: '08-08', revenue: 0, visitors: 38, orders: 0, newCustomers: 0, pageviews: 152 },
    { date: '08-09', revenue: 0, visitors: 42, orders: 0, newCustomers: 0, pageviews: 168 },
    { date: '08-10', revenue: 0, visitors: 48, orders: 0, newCustomers: 0, pageviews: 192 },
    { date: '08-11', revenue: 0, visitors: 35, orders: 0, newCustomers: 0, pageviews: 140 },
    { date: '08-12', revenue: 0, visitors: 33, orders: 0, newCustomers: 0, pageviews: 132 },
    { date: '08-13', revenue: 0, visitors: 31, orders: 0, newCustomers: 0, pageviews: 124 },
    { date: '08-14', revenue: 0, visitors: 29, orders: 0, newCustomers: 0, pageviews: 116 },
    { date: '08-15', revenue: 0, visitors: 37, orders: 0, newCustomers: 0, pageviews: 148 },
    { date: '08-16', revenue: 0, visitors: 34, orders: 0, newCustomers: 0, pageviews: 136 },
    { date: '08-17', revenue: 0, visitors: 32, orders: 0, newCustomers: 0, pageviews: 128 },
    { date: '08-18', revenue: 0, visitors: 30, orders: 0, newCustomers: 0, pageviews: 120 },
    { date: '08-19', revenue: 0, visitors: 28, orders: 0, newCustomers: 0, pageviews: 112 },
    { date: '08-20', revenue: 0, visitors: 41, orders: 0, newCustomers: 0, pageviews: 164 },
    { date: '08-21', revenue: 0, visitors: 44, orders: 0, newCustomers: 0, pageviews: 176 },
    { date: '08-22', revenue: 0, visitors: 52, orders: 0, newCustomers: 0, pageviews: 208 },
    { date: '08-23', revenue: 0, visitors: 15, orders: 0, newCustomers: 0, pageviews: 60 },
    { date: '08-24', revenue: 0, visitors: 65, orders: 0, newCustomers: 0, pageviews: 260 },
    { date: '08-25', revenue: 0, visitors: 25, orders: 0, newCustomers: 0, pageviews: 100 },
    { date: '08-26', revenue: 0, visitors: 58, orders: 0, newCustomers: 0, pageviews: 232 },
    { date: '08-27', revenue: 0, visitors: 75, orders: 0, newCustomers: 0, pageviews: 300 },
    { date: '08-28', revenue: 0, visitors: 22, orders: 0, newCustomers: 0, pageviews: 88 },
    { date: '08-29', revenue: 0, visitors: 48, orders: 0, newCustomers: 0, pageviews: 192 },
    { date: '08-30', revenue: 0, visitors: 95, orders: 0, newCustomers: 0, pageviews: 380 },
    { date: '08-31', revenue: 0, visitors: 78, orders: 0, newCustomers: 0, pageviews: 312 },
    { date: '09-01', revenue: 0, visitors: 55, orders: 0, newCustomers: 0, pageviews: 220 },
    { date: '09-02', revenue: 0, visitors: 42, orders: 0, newCustomers: 0, pageviews: 168 },
    { date: '09-03', revenue: 0, visitors: 68, orders: 0, newCustomers: 0, pageviews: 272 },
    { date: '09-04', revenue: 0, visitors: 35, orders: 0, newCustomers: 0, pageviews: 140 },
    { date: '09-05', revenue: 0, visitors: 28, orders: 0, newCustomers: 0, pageviews: 112 }
  ];

  const chartConfigs = {
    revenue: {
      title: 'Revenue',
      dataKey: 'revenue',
      color: '#f59e0b',
      value: 'NPR 0.00',
      change: '100.00% ↑',
      description: 'Total revenue generated'
    },
    visitors: {
      title: 'Website Visitors',
      dataKey: 'visitors',
      color: '#3b82f6',
      value: '141',
      change: '11.32% ↑',
      description: 'Unique website visitors'
    },
    orders: {
      title: 'Orders',
      dataKey: 'orders',
      color: '#10b981',
      value: '0',
      change: '0.00%',
      description: 'Total orders placed'
    },
    newCustomers: {
      title: 'New Customers',
      dataKey: 'newCustomers',
      color: '#8b5cf6',
      value: '0',
      change: '0.00%',
      description: 'New customer acquisitions'
    },
    pageviews: {
      title: 'Pageviews',
      dataKey: 'pageviews',
      color: '#ef4444',
      value: '255',
      change: '21.78% ↑',
      description: 'Total page views'
    }
  };

  const currentConfig = chartConfigs[selectedChart];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Website Analytics Dashboard</h1>
          <p className="text-gray-600">Yesterday (2025-09-05 ~ 2025-09-05)</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          {Object.entries(chartConfigs).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedChart(key)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                selectedChart === key
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.title}
            </button>
          ))}
        </div>

        {/* Current Metric Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{currentConfig.title}</h2>
              <p className="text-gray-600 text-sm">{currentConfig.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{currentConfig.value}</div>
              <div className={`text-sm font-medium ${
                currentConfig.change.includes('↑') ? 'text-green-600' : 'text-gray-500'
              }`}>
                {currentConfig.change}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {currentConfig.title} Trend (Last 30 Days)
          </h3>
          
          <ResponsiveContainer width="100%" height={400}>
            {selectedChart === 'orders' || selectedChart === 'newCustomers' ? (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <Bar 
                  dataKey={currentConfig.dataKey} 
                  fill={currentConfig.color}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={currentConfig.dataKey} 
                  stroke={currentConfig.color}
                  strokeWidth={3}
                  dot={{ fill: currentConfig.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: currentConfig.color, strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Key Insights</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              {selectedChart === 'visitors' && (
                <>
                  <li>• Peak visitor day: August 30 (95 visitors)</li>
                  <li>• Average daily visitors: 44</li>
                  <li>• 11.32% increase vs previous day</li>
                </>
              )}
              {selectedChart === 'pageviews' && (
                <>
                  <li>• Peak pageviews: August 30 (380 views)</li>
                  <li>• Average pages per visitor: ~4</li>
                  <li>• 21.78% increase vs previous day</li>
                </>
              )}
              {selectedChart === 'revenue' && (
                <>
                  <li>• No revenue recorded in this period</li>
                  <li>• 0% conversion rate</li>
                  <li>• Focus needed on monetization</li>
                </>
              )}
              {selectedChart === 'orders' && (
                <>
                  <li>• No orders placed in this period</li>
                  <li>• Consider improving checkout process</li>
                  <li>• Review product pricing and positioning</li>
                </>
              )}
              {selectedChart === 'newCustomers' && (
                <>
                  <li>• No new customer acquisitions</li>
                  <li>• Review marketing campaigns</li>
                  <li>• Consider lead magnets or incentives</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Recommendations</h4>
            <ul className="text-amber-700 text-sm space-y-1">
              {selectedChart === 'visitors' && (
                <>
                  <li>• Continue current traffic strategies</li>
                  <li>• Analyze August 30 spike for replication</li>
                  <li>• Focus on visitor retention</li>
                </>
              )}
              {selectedChart === 'pageviews' && (
                <>
                  <li>• Good engagement with 4+ pages per visit</li>
                  <li>• Optimize high-traffic pages</li>
                  <li>• Add internal linking</li>
                </>
              )}
              {selectedChart === 'revenue' && (
                <>
                  <li>• Implement payment gateway</li>
                  <li>• Add product pricing</li>
                  <li>• Create sales funnel</li>
                </>
              )}
              {selectedChart === 'orders' && (
                <>
                  <li>• Test checkout flow usability</li>
                  <li>• Add trust signals</li>
                  <li>• Offer limited-time promotions</li>
                </>
              )}
              {selectedChart === 'newCustomers' && (
                <>
                  <li>• Launch referral program</li>
                  <li>• Improve onboarding flow</li>
                  <li>• Create compelling value proposition</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;