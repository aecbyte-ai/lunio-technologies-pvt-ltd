import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Megaphone, 
  Store, 
  DollarSign, 
  HelpCircle, 
  Settings,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Settings as SettingsIcon,
  MessageCircle,
  X,
  Info,
  MoreVertical,
  Package2
} from 'lucide-react';


const allProducts = [
  {
    id: 1,
    name: 'McAfee total protection 1 year | 1 PC',
    sku: '4524109311745522673',
    image: '/api/placeholder/40/40',
    price: 1800,
    stock: 899,
    active: true,
    status: 'Qualified',
    ratings: { up: 0, down: 1, views: 55, comments: 0 }
  },
  {
    id: 2,
    name: 'Canva Personal plan 1 year',
    sku: '4524109311726357446',
    image: '/api/placeholder/40/40',
    price: 10000,
    stock: 1000,
    active: true,
    status: 'To be improved',
    ratings: { up: 0, down: 1, views: 27, comments: 0 }
  },
  {
    id: 3,
    name: 'MasterCard USA 10 USD-20 USD Prepaid Card [MyPrepaidCenter]',
    sku: '4524109311754803562',
    image: '/api/placeholder/40/40',
    price: '1,750 - 3,500',
    stock: 1000,
    active: true,
    status: 'Qualified',
    ratings: { up: 0, down: 9, views: 1200, comments: 0 }
  },
  {
    id: 4,
    name: 'Free Fire Diamond Topup UID [ 1090 Diamonds]',
    sku: '4349865432730125923',
    image: '/api/placeholder/40/40',
    price: '1,750 - 3,500',
    stock: 1000,
    active: false,
    status: 'To be improved',
    ratings: { up: 0, down: 9, views: 1200, comments: 0 }
  }
];

const activeProducts = allProducts.filter(p => p.active);
const inactiveProducts = [
  {
    id: 4,
    name: 'Free Fire Diamond Topup UID [ 1090 Diamonds]',
    sku: '4349865432730125923',
    image: '/api/placeholder/40/40',
    price: '1,750 - 3,500',
    stock: 1000,
    active: false,
    status: 'To be improved',
    ratings: { up: 0, down: 9, views: 1200, comments: 0 }
  }
];

const deletedProducts = [
  {
    id: 5,
    name: 'McAfee total protection 1 year | 1 PC',
    sku: '4524109311745522673',image: '/api/placeholder/40/40',
    price: '1,750 - 3,500',
    stock: 1000,
    active: false,
    status: 'To be improved',
    ratings: { up: 0, down: 9, views: 1200, comments: 0 },
    deletedOn: '2025-07-26 23:53',
    deleted: true
  },
  {
    id: 6,
    name: 'Canva Personal plan 1 year',
    sku: '4524109311726357446',
    image: '/api/placeholder/40/40',
    price: '1,750 - 3,500',
    stock: 1000,
    active: false,
    status: 'To be improved',
    ratings: { up: 0, down: 9, views: 1200, comments: 0 },
    deletedOn: '2025-07-26 23:53',
    deleted: true
  },
  {
    id: 7,
    name: 'MasterCard USA 10 USD-20 USD Prepaid Card [MyPrepaidCenter]',
    sku: '4524109311754803562',
    image: '/api/placeholder/40/40',
    price: '1,750 - 3,500',
    stock: 1000,
    active: false,
    status: 'To be improved',
    ratings: { up: 0, down: 9, views: 1200, comments: 0 },
    deletedOn: '2025-07-26 23:53',
    deleted: true
  }
];

const Manage_Products = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [showBanner, setShowBanner] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const tabs = [
    { name: 'All', count: null },
    { name: 'Active', count: null },
    { name: 'Inactive', count: null },
    { name: 'Draft', count: null },
    { name: 'Pending QC', count: null },
    { name: 'Deleted', count: 5 }
  ];

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'Active':
        return activeProducts;
      case 'Inactive':
        return inactiveProducts;
      case 'Deleted':
        return deletedProducts;
      case 'Draft':
      case 'Pending QC':
        return [];
      default:
        return allProducts;
    }
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleProductActive = (productId: number) => {
    console.log('Toggle product:', productId);
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-32 h-32 mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-80"></div>
        <div className="absolute inset-4 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-60"></div>
        <div className="absolute inset-8 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <Package2 size={32} className="text-blue-500" />
        </div>
        <div className="absolute top-2 right-6 w-3 h-3 bg-purple-400 rounded-full"></div>
        <div className="absolute top-6 right-2 w-2 h-2 bg-blue-400 rounded-full"></div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No product under this status or filter</h3>
      <p className="text-gray-500 text-sm">Please check other product status or use other filter.</p>
    </div>
  );

  const renderDeletedProducts = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{selectedProducts.length} products selected</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors">
              Deactivate
            </button>
            <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
              Delete
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
              Export Selected Products
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Product Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deletedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-blue-600">
                        <Info size={16} />
                        <span>Restore product to edit. Deleted on: {product.deletedOn}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Restore
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProductTable = () => {
    const products = getCurrentProducts();
    
    if (products.length === 0) {
      return renderEmptyState();
    }

    if (activeTab === 'Deleted') {
      return renderDeletedProducts();
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Product Info</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-1">
                    <span>Stock</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Active</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Content Score</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">Seller Sku: {product.sku}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <span>👍 {product.ratings.up}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👎 {product.ratings.down}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👁️ {product.ratings.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬 {product.ratings.comments}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">Rs. {product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{product.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.active}
                        onChange={() => toggleProductActive(product.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        product.status === 'Qualified' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="text-sm text-gray-700">{product.status}</span>
                      <Info size={14} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Total {products.length}</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
      return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Page Content */}
        <div className="">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Product Data
              </button>
              <div className="relative">
                <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <span>Bulk Manage</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                + New Product
              </button>
            </div>
          </div>

          {/* Info Banner */}
          {showBanner && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <Info size={20} className="text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-blue-700 text-sm">
                  <strong>Welcome to Product Management Page.</strong>{' '}
                  <a href="#" className="underline">Learn More</a>
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Try the New Size Chart Tool to enrich your fashion products information.{' '}
                  <a href="#" className="underline">Learn how to use</a>
                </p>
              </div>
              <button onClick={() => setShowBanner(false)} className="text-blue-400 hover:text-blue-600">
                <X size={16} />
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center space-x-6 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`pb-2 text-sm font-medium transition-colors relative flex items-center space-x-2 ${
                  activeTab === tab.name
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.name}</span>
                {tab.count && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Please Input"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Category</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort By</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions for specific tabs */}
          {(activeTab === 'Inactive' || activeTab === 'Deleted') && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedProducts.length} products selected</span>
              </div>
              <div className="flex items-center space-x-2">
                {activeTab === 'Inactive' && (
                  <>
                    <button className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors">
                      Activate
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                  </>
                )}
                {activeTab === 'Deleted' && (
                  <>
                    <button className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors">
                      Deactivate
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                  </>
                )}
                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                  Export Selected Products
                </button>
              </div>
            </div>
          )}

          {/* Products Content */}
          {renderProductTable()}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Lumino Technologies 2024. All rights reserved.</span>
            <span>Help Center</span>
          </div>
        </footer>
      </div>
    </div>
  );
  };

export default Manage_Products