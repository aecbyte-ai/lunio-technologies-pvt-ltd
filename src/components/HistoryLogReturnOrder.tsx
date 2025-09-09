import React from 'react';
import { X, Clock } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const historyItems = [
    {
      id: 1,
      action: 'Export CSV',
      user: 'John Admin',
      timestamp: '2024-01-15 14:30:25',
      details: 'Exported 25 return orders (All status)'
    },
    {
      id: 2,
      action: 'Bulk Refund',
      user: 'Sarah Manager',
      timestamp: '2024-01-15 13:15:10',
      details: 'Processed refunds for 5 orders'
    },
    {
      id: 3,
      action: 'Status Update',
      user: 'Mike QC',
      timestamp: '2024-01-15 11:45:33',
      details: 'Updated RET003 to QC in Progress'
    },
    {
      id: 4,
      action: 'Export PDF',
      user: 'Lisa Admin',
      timestamp: '2024-01-14 16:20:15',
      details: 'Generated monthly return report'
    },
    {
      id: 5,
      action: 'Return Processed',
      user: 'David Warehouse',
      timestamp: '2024-01-14 10:30:45',
      details: 'Marked RET004 as returned to warehouse'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Action History</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-96">
          <div className="space-y-4">
            {historyItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{item.action}</h4>
                    <span className="text-xs text-gray-500">{item.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                  <p className="text-xs text-gray-500 mt-1">by {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;