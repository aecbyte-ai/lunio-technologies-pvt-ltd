import React from 'react';
import { Megaphone, Percent, Truck, Gem, Video } from 'lucide-react';

interface ToolkitItemProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  onClick: () => void;
}

const ToolkitItem: React.FC<ToolkitItemProps> = ({ icon, title, color, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-all duration-300 hover:border-blue-200 group min-h-[120px] flex flex-col items-center justify-center"
  >
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-sm font-medium text-gray-900 leading-tight">{title}</h3>
  </button>
);

export const PopularToolkit: React.FC = () => {
  const handleToolClick = (tool: string) => {
    console.log(`${tool} clicked`);
  };

  const tools = [
    {
      icon: <Megaphone className="w-6 h-6 text-white" />,
      title: 'Marketing Solutions',
      color: 'bg-blue-600',
      key: 'marketing'
    },
    {
      icon: <Percent className="w-6 h-6 text-white" />,
      title: 'Regular Voucher',
      color: 'bg-blue-600',
      key: 'voucher'
    },
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      title: 'Free Shipping',
      color: 'bg-blue-600',
      key: 'shipping'
    },
    {
      icon: <Gem className="w-6 h-6 text-white" />,
      title: 'Gems Discount',
      color: 'bg-blue-600',
      key: 'gems'
    },
    {
      icon: <Video className="w-6 h-6 text-white" />,
      title: 'Education Livestream',
      color: 'bg-blue-600',
      key: 'education'
    }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Popular Toolkit</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tools.map((tool) => (
          <ToolkitItem
            key={tool.key}
            icon={tool.icon}
            title={tool.title}
            color={tool.color}
            onClick={() => handleToolClick(tool.title)}
          />
        ))}
      </div>
    </div>
  );
};