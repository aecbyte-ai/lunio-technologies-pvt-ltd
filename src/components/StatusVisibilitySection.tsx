import React from 'react';
import { Eye, ToggleLeft as Toggle, Star, CheckCircle } from 'lucide-react';

interface StatusVisibilitySectionProps {
  data: any;
  updateData: (data: any) => void;
}

const StatusVisibilitySection: React.FC<StatusVisibilitySectionProps> = ({ data, updateData }) => {
  const handleInputChange = (field: string, value: any) => {
    updateData({ ...data, [field]: value });
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'private', label: 'Private', description: 'Only visible to admins' },
    { value: 'draft', label: 'Draft', description: 'Not published yet' }
  ];

  return (
    <div className="space-y-6">
      {/* Product Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Status & Visibility</h2>
        </div>

        <div className="space-y-6">
          {/* Product Status Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Toggle className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Product Status</h3>
                <p className="text-sm text-gray-500">
                  {data.status === 'active' ? 'Product is live and available' : 'Product is disabled'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('status', data.status === 'active' ? 'inactive' : 'active')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                data.status === 'active' ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  data.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Visibility Settings */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Visibility</h3>
            </div>
            <div className="space-y-3">
              {visibilityOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value={option.value}
                    checked={data.visibility === option.value}
                    onChange={(e) => handleInputChange('visibility', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900">{option.label}</span>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Product */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Star className={`w-5 h-5 ${data.featured ? 'text-amber-500' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-medium text-gray-900">Featured Product</h3>
                <p className="text-sm text-gray-500">
                  Show this product in featured sections
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('featured', !data.featured)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                data.featured ? 'bg-amber-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  data.featured ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Publishing Options</h3>
        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publish Now
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Schedule for Later
          </button>
        </div>
      </div>

      {/* Product Summary */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Product Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${data.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              {data.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Visibility:</span>
            <span className="font-medium text-gray-900 capitalize">{data.visibility}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Featured:</span>
            <span className={`font-medium ${data.featured ? 'text-amber-600' : 'text-gray-500'}`}>
              {data.featured ? 'Yes' : 'No'}
            </span>
          </div>
          {data.variants.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Variants:</span>
              <span className="font-medium text-gray-900">{data.variants.length} variants</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusVisibilitySection;