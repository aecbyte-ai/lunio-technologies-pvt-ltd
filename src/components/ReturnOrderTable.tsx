import React from 'react';
import { ReturnOrder } from '../types/ReturnOrder';

interface ReturnOrderTableProps {
  orders: ReturnOrder[];
  onRefundOnly: (orderId: string) => void;
  onReturnToWarehouse: (orderId: string) => void;
}

const ReturnOrderTable: React.FC<ReturnOrderTableProps> = ({ 
  orders, 
  onRefundOnly, 
  onReturnToWarehouse 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Return Initiated':
        return 'bg-blue-100 text-blue-800';
      case 'Return in Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'QC in Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Returned':
        return 'bg-green-100 text-green-800';
      case 'Scrapped':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative mb-8">
          <svg width="200" height="120" viewBox="0 0 200 120" className="text-purple-300">
            <ellipse cx="100" cy="80" rx="80" ry="40" fill="#E8D5FF" opacity="0.6" />
            <ellipse cx="120" cy="60" rx="60" ry="35" fill="#B794F6" opacity="0.8" />
            <ellipse cx="80" cy="70" rx="40" ry="25" fill="#90CDF4" opacity="0.7" />
            <ellipse cx="140" cy="45" rx="30" ry="20" fill="#FBB6CE" opacity="0.6" />
            <ellipse cx="60" cy="85" rx="25" ry="15" fill="#63B3ED" opacity="0.8" />
            <circle cx="100" cy="65" r="18" fill="none" stroke="#4C51BF" strokeWidth="3" />
            <line x1="113" y1="78" x2="125" y2="90" stroke="#4C51BF" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          No return order under this status or filter
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Refund Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                  <div className="text-sm text-gray-500">{order.returnDate}</div>
                  {order.trackingNumber && (
                    <div className="text-xs text-blue-600">Track: {order.trackingNumber}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerPhone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded object-cover mr-3" 
                      src={order.productImage} 
                      alt={order.productName}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                      <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                      <div className="text-xs text-gray-400">{order.returnReason}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${order.refundAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onRefundOnly(order.id)}
                    className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                  >
                    Refund Only
                  </button>
                  <button
                    onClick={() => onReturnToWarehouse(order.id)}
                    className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                  >
                    Return to Warehouse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnOrderTable;