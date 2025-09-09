import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';

const IncomeDetails: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-08-05');
  const [endDate, setEndDate] = useState('2025-08-12');
  const [selectedStatus, setSelectedStatus] = useState('Please Select');

  const transactions = [
    {
      date: '11 Aug 2025',
      feeName: 'Commission Fee',
      statementNumber: 'NPINJ15-2025-033',
      amount: 'NPR -327.70',
      type: 'deduction'
    },
    {
      date: '11 Aug 2025',
      feeName: 'Payment Fee',
      statementNumber: 'NPINJ15-2025-033',
      amount: 'NPR -81.93',
      type: 'deduction'
    },
    {
      date: '11 Aug 2025',
      feeName: 'Product Price Paid by Buyer',
      statementNumber: 'NPINJ15-2025-033',
      amount: 'NPR 2,000.00',
      type: 'credit'
    },
    {
      date: '10 Aug 2025',
      feeName: 'Commission Fee',
      statementNumber: 'NPINJ15-2025-032',
      amount: 'NPR -327.70',
      type: 'deduction'
    },
    {
      date: '10 Aug 2025',
      feeName: 'Payment Fee',
      statementNumber: 'NPINJ15-2025-032',
      amount: 'NPR -81.93',
      type: 'deduction'
    }
  ];

  return (
    <div className="space-y-6">

      {/* Income Details Section */}
      <div className="bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Income Details</h2>
        
        {/* Date Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32 text-sm"
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32 text-sm"
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option>Please Select</option>
            <option>Released</option>
            <option>Pending</option>
          </select>

          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Reset
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-sm text-gray-600">Total Amount</span>
              <Info className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <div className="text-2xl font-bold text-gray-900">NPR 9,845.48</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-sm text-gray-600">Revenue</span>
              <Info className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <div className="text-2xl font-bold text-gray-900">NPR 11,600.00</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-sm text-gray-600">Deductions</span>
              <Info className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <div className="text-2xl font-bold text-red-500">NPR -1,754.52</div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Transaction Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Fee Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Statement Number</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Order Details</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-700">{transaction.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{transaction.feeName}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      {transaction.statementNumber}
                      <button className="ml-2 w-4 h-4 bg-gray-200 rounded text-xs text-gray-600 hover:bg-gray-300 transition-colors">
                        📋
                      </button>
                    </div>
                  </td>
                  <td className={`py-4 px-4 text-sm font-medium ${transaction.type === 'deduction' ? 'text-gray-700' : 'text-gray-700'}`}>
                    {transaction.amount}
                  </td>
                  <td className="py-4 px-4">
                    <button className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <span className="text-gray-600 text-xs">📄</span>
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <button className="block text-xs text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                        View Order Details
                      </button>
                      <button className="block text-xs text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                        View Statement Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Items per page:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Previous</button>
            <button className="w-8 h-8 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 transition-colors">1</button>
            <button className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded text-sm transition-colors">2</button>
            <button className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded text-sm transition-colors">3</button>
            <button className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded text-sm transition-colors">4</button>
            <span className="text-gray-500">...</span>
            <button className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded text-sm transition-colors">10</button>
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Next</button>
            <div className="ml-4 text-sm text-gray-500">
              1/10 Go to
              <input type="text" className="w-12 mx-2 px-1 py-1 border border-gray-300 rounded text-center text-xs" />
              <button className="text-blue-600 hover:text-blue-800 transition-colors">View</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IncomeDetails;