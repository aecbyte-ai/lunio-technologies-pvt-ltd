import React, { useState } from 'react';

const IncomeStatement: React.FC = () => {
  const [releaseStatus, setReleaseStatus] = useState('Release Status');
  const [statementNumber, setStatementNumber] = useState('');

  const statements = [
    {
      statementNumber: 'NPINJ15-2025-033',
      period: '11 Aug 2025 - 17 Aug 2025',
      releasedAmount: 'NPR 2,461.37',
      releaseStatus: 'Ready to Release',
      statusColor: 'text-orange-600 bg-orange-100'
    },
    {
      statementNumber: 'NPINJ15-2025-032',
      period: '04 Aug 2025 - 10 Aug 2025',
      releasedAmount: 'NPR 7,384.11',
      releaseStatus: 'Ready to Release',
      statusColor: 'text-orange-600 bg-orange-100'
    },
    {
      statementNumber: 'NPINJ15-2025-031',
      period: '28 Jul 2025 - 03 Aug 2025',
      releasedAmount: 'NPR 4,922.74',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-030',
      period: '21 Jul 2025 - 27 Jul 2025',
      releasedAmount: 'NPR 9,419.41',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-029',
      period: '14 Jul 2025 - 20 Jul 2025',
      releasedAmount: 'NPR 10,523.77',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-028',
      period: '07 Jul 2025 - 13 Jul 2025',
      releasedAmount: 'NPR 12,641.07',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-027',
      period: '30 Jun 2025 - 06 Jul 2025',
      releasedAmount: 'NPR 2,461.37',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-026',
      period: '23 Jun 2025 - 29 Jun 2025',
      releasedAmount: 'NPR 4,893.74',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-025',
      period: '16 Jun 2025 - 22 Jun 2025',
      releasedAmount: 'NPR 14,738.22',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      statementNumber: 'NPINJ15-2025-024',
      period: '09 Jun 2025 - 15 Jun 2025',
      releasedAmount: 'NPR 2,442.37',
      releaseStatus: 'Released',
      statusColor: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* View Statements Section */}
      <div className="bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">View Statements</h2>
        
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <select 
            value={releaseStatus}
            onChange={(e) => setReleaseStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option>Release Status</option>
            <option>Released</option>
            <option>Ready to Release</option>
          </select>

          <input
            type="text"
            placeholder="Statement Number"
            value={statementNumber}
            onChange={(e) => setStatementNumber(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-48"
          />

          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Reset
          </button>
        </div>

        {/* Statements Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Statement Number</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Statement Period</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Released Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Release Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {statements.map((statement, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-700 font-medium">{statement.statementNumber}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{statement.period}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 font-medium">{statement.releasedAmount}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statement.statusColor}`}>
                      {statement.releaseStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <button className="block text-xs text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                        View Statement Details
                      </button>
                      <button className="block text-xs text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                        Print Invoice
                      </button>
                      <button className="block text-xs text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                        Download ↓
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

export default IncomeStatement;