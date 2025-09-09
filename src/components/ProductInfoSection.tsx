import React from 'react';
import { Package, Tag, Building2, Plus, X, GripVertical } from 'lucide-react';

interface ProductInfoSectionProps {
  data: any;
  updateData: (data: any) => void;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ data, updateData }) => {
  const categories = [
    { id: 'electronics', name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories'] },
    { id: 'clothing', name: 'Clothing', subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { id: 'home-garden', name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
    { id: 'sports', name: 'Sports & Outdoors', subcategories: ['Fitness', 'Outdoor Recreation', 'Team Sports', 'Water Sports'] }
  ];

  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Canon', 'Dell', 'HP', 'Microsoft'];

  const addDescriptionPoint = () => {
    updateData({ ...data, description: [...data.description, ''] });
  };

  const updateDescriptionPoint = (index: number, value: string) => {
    const newDescription = [...data.description];
    newDescription[index] = value;
    updateData({ ...data, description: newDescription });
  };

  const removeDescriptionPoint = (index: number) => {
    const newDescription = data.description.filter((_: string, i: number) => i !== index);
    updateData({ ...data, description: newDescription });
  };

  const moveDescriptionPoint = (fromIndex: number, toIndex: number) => {
    const newDescription = [...data.description];
    const [removed] = newDescription.splice(fromIndex, 1);
    newDescription.splice(toIndex, 0, removed);
    updateData({ ...data, description: newDescription });
  };

  const handleInputChange = (field: string, value: any) => {
    if (field === 'productName') {
      updateData({ ...data, productName: value, slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') });
    } else {
      updateData({ ...data, [field]: value });
    }
  };

  const selectedCategory = categories.find(cat => cat.id === data.category);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Package className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Product Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={data.productName}
            onChange={(e) => handleInputChange('productName', e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU / Product Code *
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={data.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
              placeholder="e.g., PROD-001"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={data.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={data.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Sub-category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub-category
          </label>
          <select
            value={data.subCategory}
            onChange={(e) => handleInputChange('subCategory', e.target.value)}
            disabled={!selectedCategory}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">Select Sub-category</option>
            {selectedCategory?.subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description (Bullet Points)
          </label>
          
          <div className="space-y-3">
            {data.description.map((point: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 group">
                <div className="flex items-center mt-3 space-x-1">
                  <button
                    type="button"
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity cursor-grab"
                    title="Drag to reorder"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <span className="text-gray-400 text-lg leading-none">•</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={point}
                    onChange={(e) => updateDescriptionPoint(index, e.target.value)}
                    placeholder="Enter a product feature or benefit..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDescriptionPoint(index)}
                  className="opacity-0 group-hover:opacity-100 mt-3 p-1 text-red-500 hover:text-red-700 transition-opacity"
                  title="Remove point"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addDescriptionPoint}
              className="flex items-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors w-full"
            >
              <Plus className="w-4 h-4" />
              <span>Add Description Point</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Add bullet points to describe your product features, benefits, and specifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;