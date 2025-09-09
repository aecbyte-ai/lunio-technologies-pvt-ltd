import React from 'react';

const IncomeChart: React.FC = () => {
  const data = [
    { date: '23 Jul 2025', value: 3000 },
    { date: '07 Jul 2025', value: 5500 },
    { date: '21 Jul 2025', value: 8000 },
    { date: '04 Aug 2025', value: 6500 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  return (
    <div className="w-full h-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm text-gray-600">Released</h3>
        <span className="text-xs text-gray-400">💰</span>
      </div>
      
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
          <span>12000</span>
          <span>9000</span>
          <span>6000</span>
          <span>3000</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 300 200">
            {/* Grid lines */}
            {[0, 50, 100, 150, 200].map((y) => (
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
              points={data.map((point, index) => {
                const x = (index / (data.length - 1)) * 280;
                const y = 180 - ((point.value - minValue) / (maxValue - minValue)) * 160;
                return `${x},${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 280;
              const y = 180 - ((point.value - minValue) / (maxValue - minValue)) * 160;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-400 mt-2 ml-12">
          {data.map((point, index) => (
            <span key={index} className="text-center">
              {point.date.split(' ')[0]}<br />{point.date.split(' ')[1]} {point.date.split(' ')[2]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 text-right">
        <span className="text-lg font-semibold text-indigo-600">NPR 9,845.48</span>
      </div>
    </div>
  );
};

export default IncomeChart;