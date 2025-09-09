import React, { useState } from 'react';
import { X, Upload, Calendar, DollarSign, Package, User, Phone, FileText } from 'lucide-react';
import { ReturnOrder } from '../types/ReturnOrder';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (order: Omit<ReturnOrder, 'id'>) => void;
}

const CreateOrderPopup: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, onCreateOrder }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    customerPhone: '',
    productName: '',
    productImage: '',
    quantity: 1,
    returnReason: '',
    returnDate: new Date().toISOString().split('T')[0],
    status: 'Return Initiated' as const,
    refundAmount: 0,
    trackingNumber: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.orderId.trim()) newErrors.orderId = 'Order ID is required';
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Customer phone is required';
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.returnReason.trim()) newErrors.returnReason = 'Return reason is required';
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    if (formData.refundAmount < 0) newErrors.refundAmount = 'Refund amount cannot be negative';

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (formData.customerPhone && !phoneRegex.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newOrder: Omit<ReturnOrder, 'id'> = {
      ...formData,
      productImage: formData.productImage || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=100'
    };

    onCreateOrder(newOrder);
    
    // Reset form
    setFormData({
      orderId: '',
      customerName: '',
      customerPhone: '',
      productName: '',
      productImage: '',
      quantity: 1,
      returnReason: '',
      returnDate: new Date().toISOString().split('T')[0],
      status: 'Return Initiated',
      refundAmount: 0,
      trackingNumber: '',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const returnReasons = [
    'Defective product',
    'Wrong size',
    'Not as described',
    'Changed mind',
    'Damaged in shipping',
    'Duplicate order',
    'Poor quality',
    'Late delivery',
    'Other'
  ];

  const statusOptions = [
    'Return Initiated',
    'Return in Progress',
    'QC in Progress',
    'Returned',
    'Scrapped',
    'Cancelled'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Return Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Order Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order ID *
                  </label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => handleInputChange('orderId', e.target.value)}
                    placeholder="e.g., ORD-2024-001"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.orderId ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.orderId && <p className="text-red-500 text-xs mt-1">{errors.orderId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => handleInputChange('returnDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Enter customer full name"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.customerName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="+1-555-0123"
                      className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.customerPhone ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Enter product name"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.productName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={formData.productImage}
                        onChange={(e) => handleInputChange('productImage', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <Upload className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Optional: Leave empty for default image</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.quantity ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Return Details */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Return Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return Reason *
                    </label>
                    <select
                      value={formData.returnReason}
                      onChange={(e) => handleInputChange('returnReason', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.returnReason ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a reason</option>
                      {returnReasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                    {errors.returnReason && <p className="text-red-500 text-xs mt-1">{errors.returnReason}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Refund Amount *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.refundAmount}
                        onChange={(e) => handleInputChange('refundAmount', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.refundAmount ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.refundAmount && <p className="text-red-500 text-xs mt-1">{errors.refundAmount}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={formData.trackingNumber}
                      onChange={(e) => handleInputChange('trackingNumber', e.target.value)}
                      placeholder="TRK123456789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional: For orders in progress</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Additional notes about the return..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
            >
              Create Return Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderPopup;