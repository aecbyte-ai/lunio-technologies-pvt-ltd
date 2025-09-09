import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, FileText } from 'lucide-react';
import ProductInfoSection from '../components/ProductInfoSection';
import PricingInventorySection from '../components/PricingInventorySection';
import MediaUploadSection from '../components/MediaUploadSection';
import VariantsSection from '../components/VariantSection';
import StatusVisibilitySection from '../components/StatusVisibilitySection';

const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState({
    // Product Information
    productName: '',
    sku: '',
    category: '',
    subCategory: '',
    brand: '',
    description: [],
    
    // Pricing & Inventory
    price: '',
    discount: { type: 'percentage', value: '' },
    stockQuantity: '',
    stockStatus: true,
    taxRate: '',
    
    // Media
    images: [],
    video: '',
    
    // Variants
    attributes: [],
    variants: [],
    
    // SEO
    metaTitle: '',
    metaDescription: '',
    slug: '',
    keywords: [],
    
    // Shipping
    weight: { value: '', unit: 'kg' },
    dimensions: { length: '', width: '', height: '', unit: 'cm' },
    shippingClass: '',
    
    // Status & Visibility
    status: 'active',
    visibility: 'public',
    featured: false
  });

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', formData);
    // Implement save as draft logic
  };

  const handlePublish = () => {
    console.log('Publishing product:', formData);
    // Implement publish logic
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All changes will be lost.')) {
      setFormData({
        productName: '',
        sku: '',
        category: '',
        subCategory: '',
        brand: '',
        description: [],
        price: '',
        discount: { type: 'percentage', value: '' },
        stockQuantity: '',
        stockStatus: true,
        taxRate: '',
        images: [],
        video: '',
        attributes: [],
        variants: [],
        metaTitle: '',
        metaDescription: '',
        slug: '',
        keywords: [],
        weight: { value: '', unit: 'kg' },
        dimensions: { length: '', width: '', height: '', unit: 'cm' },
        shippingClass: '',
        status: 'active',
        visibility: 'public',
        featured: false
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className=" mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <ProductInfoSection 
              data={formData} 
              updateData={(data) => updateFormData('productInfo', data)} 
            />
            <PricingInventorySection 
              data={formData} 
              updateData={(data) => updateFormData('pricing', data)} 
            />
            <MediaUploadSection 
              data={formData} 
              updateData={(data) => updateFormData('media', data)} 
            />
            <VariantsSection 
              data={formData} 
              updateData={(data) => updateFormData('variants', data)} 
            />
          </div>

          {/* Right Column - Status & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <StatusVisibilitySection 
                data={formData} 
                updateData={(data) => updateFormData('status', data)} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;