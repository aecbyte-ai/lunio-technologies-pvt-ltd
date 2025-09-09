import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, ShoppingCart, MapPin, Calendar, Download, Filter } from 'lucide-react';

export const CustomerAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  const analyticsData = {
    totalCustomers: 1247,
    newCustomers: 89,
    activeCustomers: 892,
    churnRate: 5.2,
    averageClv: 1850.75,
    averageOrderValue: 127.50,
    topCustomers: [
      { name: 'Emily Davis', revenue: 8750.25, orders: 45 },
      { name: 'John Smith', revenue: 3450.75, orders: 24 },
      { name: 'Michael Brown', revenue: 1250.00, orders: 8 },
      { name: 'Sarah Johnson', revenue: 287.50, orders: 3 },
      { name: 'David Wilson', revenue: 890.00, orders: 12 },
    ],
    geoDistribution: [
      { location: 'New York, NY', customers: 234, percentage: 18.8 },
      { location: 'Los Angeles, CA', customers: 189, percentage: 15.2 },
      { location: 'Chicago, IL', customers: 156, percentage: 12.5 },
      { location: 'Miami, FL', customers: 134, percentage: 10.7 },
      { location: 'Seattle, WA', customers: 98, percentage: 7.9 },
    ],
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Analytics</h1>
            <p className="text-gray-600">Insights and metrics about your customer base</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{analyticsData.totalCustomers.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Customers</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{analyticsData.newCustomers}</h3>
          <p className="text-sm text-gray-600">New Customers</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+15.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${analyticsData.averageClv.toFixed(2)}</h3>
          <p className="text-sm text-gray-600">Average CLV</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">+2.1%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{analyticsData.churnRate}%</h3>
          <p className="text-sm text-gray-600">Churn Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Customers by Revenue</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${customer.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.geoDistribution.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{location.location}</p>
                      <p className="text-sm text-gray-500">{location.customers} customers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{location.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};