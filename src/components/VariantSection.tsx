import React, { useState } from 'react';
import { Settings, Plus, X, Edit3 } from 'lucide-react';

interface VariantsSectionProps {
  data: any;
  updateData: (data: any) => void;
}

const VariantsSection: React.FC<VariantsSectionProps> = ({ data, updateData }) => {
  const [newAttribute, setNewAttribute] = useState({ name: '', values: '' });
  const [showVariantTable, setShowVariantTable] = useState(false);

  const addAttribute = () => {
    if (newAttribute.name && newAttribute.values) {
      const attribute = {
        id: Date.now(),
        name: newAttribute.name,
        values: newAttribute.values.split(',').map(v => v.trim()).filter(v => v)
      };
      
      const newAttributes = [...data.attributes, attribute];
      updateData({ ...data, attributes: newAttributes });
      
      // Generate variants
      generateVariants(newAttributes);
      
      setNewAttribute({ name: '', values: '' });
      setShowVariantTable(true);
    }
  };

  const removeAttribute = (id: number) => {
    const newAttributes = data.attributes.filter((attr: any) => attr.id !== id);
    updateData({ ...data, attributes: newAttributes });
    generateVariants(newAttributes);
  };

  const generateVariants = (attributes: any[]) => {
    if (attributes.length === 0) {
      updateData({ ...data, variants: [] });
      return;
    }

    const combinations = getCombinations(attributes);
    const variants = combinations.map((combination, index) => ({
      id: Date.now() + index,
      attributes: combination,
      sku: `${data.sku}-${index + 1}`,
      price: data.price || '0',
      stock: '0',
      enabled: true
    }));

    updateData({ ...data, variants });
  };

  const getCombinations = (attributes: any[]): any[] => {
    if (attributes.length === 0) return [];
    if (attributes.length === 1) {
      return attributes[0].values.map((value: string) => [{ name: attributes[0].name, value }]);
    }

    const [first, ...rest] = attributes;
    const restCombinations = getCombinations(rest);
    const combinations = [];

    for (const value of first.values) {
      for (const restCombination of restCombinations) {
        combinations.push([{ name: first.name, value }, ...restCombination]);
      }
    }

    return combinations;
  };

  const updateVariant = (variantId: number, field: string, value: any) => {
    const updatedVariants = data.variants.map((variant: any) => 
      variant.id === variantId ? { ...variant, [field]: value } : variant
    );
    updateData({ ...data, variants: updatedVariants });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Settings className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Variants & Attributes</h2>
      </div>

      <div className="space-y-6">
        {/* Add Attributes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Attributes
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <input
                type="text"
                value={newAttribute.name}
                onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                placeholder="Attribute name (e.g., Size, Color)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                value={newAttribute.values}
                onChange={(e) => setNewAttribute({ ...newAttribute, values: e.target.value })}
                placeholder="Values (comma separated: S, M, L)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={addAttribute}
                className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Attribute
              </button>
            </div>
          </div>

          {/* Current Attributes */}
          {data.attributes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Current Attributes:</h4>
              <div className="flex flex-wrap gap-2">
                {data.attributes.map((attribute: any) => (
                  <div key={attribute.id} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      {attribute.name}:
                    </span>
                    <span className="text-sm text-gray-600 mr-2">
                      {attribute.values.join(', ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttribute(attribute.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Variants Table */}
        {data.variants.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">
                Generated Variants ({data.variants.length})
              </h4>
              <button
                type="button"
                onClick={() => setShowVariantTable(!showVariantTable)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                {showVariantTable ? 'Hide' : 'Edit'} Variants
              </button>
            </div>

            {showVariantTable && (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Enabled
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Variant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        SKU
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.variants.map((variant: any) => (
                      <tr key={variant.id} className={variant.enabled ? '' : 'bg-gray-50 opacity-60'}>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <input
                            type="checkbox"
                            checked={variant.enabled}
                            onChange={(e) => updateVariant(variant.id, 'enabled', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <div className="flex flex-wrap gap-1">
                            {variant.attributes.map((attr: any, index: number) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {attr.name}: {attr.value}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => updateVariant(variant.id, 'price', e.target.value)}
                            step="0.01"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => updateVariant(variant.id, 'stock', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantsSection;