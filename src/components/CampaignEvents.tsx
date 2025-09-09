import React, { useState, useEffect } from 'react';

export const CampaignEvents: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 5,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoinNow = () => {
    console.log('Join Now clicked');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Campaign Events</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
          More →
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-sm">
        {/* Countdown Timer */}
        <div className="flex justify-center space-x-2 mb-6">
          {[
            { value: String(timeLeft.days).padStart(2, '0'), label: 'DAYS' },
            { value: String(timeLeft.hours).padStart(2, '0'), label: 'HOURS' },
            { value: String(timeLeft.minutes).padStart(2, '0'), label: 'MINS' },
            { value: String(timeLeft.seconds).padStart(2, '0'), label: 'SECS' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-900 text-white px-2 py-1 rounded-md font-bold text-sm min-w-[32px]">
                {item.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Campaign Card */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 text-white text-center mb-4">
          <div className="text-sm mb-1">🔥 Daraz</div>
          <div className="text-2xl font-bold mb-1">8.8</div>
          <div className="text-sm font-semibold mb-3">DEALS HEREKO HERAI</div>
          <button 
            onClick={handleJoinNow}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 transform hover:scale-105"
          >
            Join Now
          </button>
        </div>

        {/* Campaign Details */}
        <div className="space-y-2 text-sm">
          <h3 className="font-semibold text-gray-900">8.8 Deals Hereko Herai</h3>
          <p className="text-gray-500">Aug 7, 2025 - Aug 14, 2025</p>
          <p className="text-gray-500">Minimum Price discount</p>
          <p className="text-gray-500">Registrations until: Aug 7, 2025</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
            Submit Deal
          </button>
        </div>
      </div>
    </div>
  );
};