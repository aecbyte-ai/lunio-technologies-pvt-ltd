import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StatCardProps {
  number: string;
  label: string;
  onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-md transition-all duration-300 hover:border-blue-200 group"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{number}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
    </div>
  </button>
);

export const OrderStats: React.FC = () => {
  const handleStatClick = (type: string) => {
    console.log(`Clicked on ${type}`);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">My Order</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Submit a Claim
          </button>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
            More →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          number="0" 
          label="Unpaid Orders" 
          onClick={() => handleStatClick('unpaid')} 
        />
        <StatCard 
          number="1" 
          label="Pending Orders" 
          onClick={() => handleStatClick('pending')} 
        />
        <StatCard 
          number="40" 
          label="To Be Reviewed" 
          onClick={() => handleStatClick('review')} 
        />
      </div>
    </div>
  );
};