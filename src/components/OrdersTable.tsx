import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const OrdersTable: React.FC = () => {
  const orders = [
    {
      id: '212068467345...',
      orderNumber: '212068234654...',
      product: 'ApeUni PTE -Exam 30 days Pra...',
      orderDate: '11 Aug 2025 10:37',
      amount: 'NPR 2,461.37',
      status: 'Delivered',
      releaseStatus: 'Ready to Release',
      statementNo: 'NPHJ15-2025-033',
      actions: ['View Order Details', 'View Statement Details']
    },
    {
      id: '212068467346...',
      orderNumber: '212068234655...',
      product: 'ApeUni PTE -Exam 30 days Pra...',
      orderDate: '11 Aug 2025 10:37',
      amount: 'NPR 2,461.37',
      status: 'Delivered',
      releaseStatus: 'Ready to Release',
      statementNo: 'NPHJ15-2025-033',
      actions: ['View Order Details', 'View Statement Details']
    },
    {
      id: '212068467347...',
      orderNumber: '212068234656...',
      product: 'ApeUni PTE -Exam 30 days Pra...',
      orderDate: '11 Aug 2025 10:37',
      amount: 'NPR 2,461.37',
      status: 'Delivered',
      releaseStatus: 'Ready to Release',
      statementNo: 'NPHJ15-2025-033',
      actions: ['View Order Details', 'View Statement Details']
    },
    {
      id: '212068467348...',
      orderNumber: '212068234657...',
      product: 'ApeUni PTE -Exam 30 days Pra...',
      orderDate: '11 Aug 2025 10:37',
      amount: 'NPR 2,461.37',
      status: 'Delivered',
      releaseStatus: 'Ready to Release',
      statementNo: 'NPHJ15-2025-033',
      actions: ['View Order Details', 'View Statement Details']
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Order Details</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Order Creation Date</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Order Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Est Release Amount</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Release Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Statement No.</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="py-4 px-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📚</span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">{order.product}</div>
                    <div className="text-xs text-gray-500">Order Number: {order.orderNumber}</div>
                    <div className="text-xs text-gray-500">Order Number: {order.orderNumber}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{order.orderDate}</td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  {order.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm font-semibold text-gray-900">{order.amount}</div>
                <div className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 transition-colors">Show Fee Details</div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  {order.releaseStatus}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{order.statementNo}</td>
              <td className="py-4 px-4">
                <div className="space-y-1">
                 {/* <Router>
                   <Link 
                    to="/order-detail-1" 
                    className="block text-xs text-blue-600 hover:text-blue-800 transition-colors duration-150 hover:underline"
                  >
                    View Order Details
                  </Link>
                  <Link 
                    to="/order-detail-2" 
                    className="block text-xs text-blue-600 hover:text-blue-800 transition-colors duration-150 hover:underline"
                  >
                    View Statement Details
                  </Link>
                 </Router> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;