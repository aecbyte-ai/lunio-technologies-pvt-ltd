import React from 'react';
import { DollarSign, Package, Percent, Calculator } from 'lucide-react';

interface PricingInventorySectionProps {
  data: any;
  updateData: (data: any) => void;
}

const PricingInventorySection: React.FC<PricingInventorySectionProps> = ({ data, updateData }) => {
  const handleInputChange = (field: string, value: any) => {
    updateData({ ...data, [field]: value });
  };

  const handleDiscountChange = (type: string, value: string) => {
    updateData({ ...data, discount: { type, value } });
  };

  const taxRates = [
    { value: '0', label: 'No Tax (0%)' },
    { value: '5', label: 'Reduced Rate (5%)' },
    { value: '10', label: 'Standard Rate (10%)' },
    { value: '18', label: 'Standard Rate (18%)' },
    { value: '20', label: 'Standard Rate (20%)' },
    { value: 'custom', label: 'Custom Rate' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-emerald-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Pricing & Inventory</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={data.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Discount Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount Type
          </label>
          <select
            value={data.discount.type}
            onChange={(e) => handleDiscountChange(e.target.value, data.discount.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount Value
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={data.discount.value}
              onChange={(e) => handleDiscountChange(data.discount.type, e.target.value)}
              placeholder={data.discount.type === 'percentage' ? '0' : '0.00'}
              step={data.discount.type === 'percentage' ? '1' : '0.01'}
              min="0"
              max={data.discount.type === 'percentage' ? '100' : undefined}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={data.stockQuantity}
              onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
              placeholder="0"
              min="0"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Status
          </label>
          <div className="flex items-center space-x-3 pt-3">
            <button
              type="button"
              onClick={() => handleInputChange('stockStatus', !data.stockStatus)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                data.stockStatus ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  data.stockStatus ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${data.stockStatus ? 'text-emerald-600' : 'text-gray-500'}`}>
              {data.stockStatus ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Tax Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate
          </label>
          <div className="relative">
            <Calculator className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={data.taxRate}
              onChange={(e) => handleInputChange('taxRate', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
            >
              <option value="">Select Tax Rate</option>
              {taxRates.map(rate => (
                <option key={rate.value} value={rate.value}>{rate.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {data.price && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Price Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">${parseFloat(data.price || 0).toFixed(2)}</span>
            </div>
            {data.discount.value && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Discount ({data.discount.type === 'percentage' ? `${data.discount.value}%` : `$${data.discount.value}`}):
                </span>
                <span className="font-medium text-red-600">
                  -${(data.discount.type === 'percentage' 
                    ? (parseFloat(data.price || 0) * parseFloat(data.discount.value || 0)) / 100
                    : parseFloat(data.discount.value || 0)
                  ).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-900 font-semibold">Final Price:</span>
              <span className="font-bold text-emerald-600">
                ${(parseFloat(data.price || 0) - (
                  data.discount.type === 'percentage' 
                    ? (parseFloat(data.price || 0) * parseFloat(data.discount.value || 0)) / 100
                    : parseFloat(data.discount.value || 0)
                )).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingInventorySection;