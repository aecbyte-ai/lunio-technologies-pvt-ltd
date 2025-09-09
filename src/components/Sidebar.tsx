import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Store, 
  DollarSign, 
  HelpCircle, 
  Settings,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onNavigate: (page: string) => void;
  currentPage?: string;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', hasDropdown: false, isActive: true, page: 'dashboard' },
  { icon: ShieldCheck, label: 'KYC Verification', hasDropdown: false, isActive: false, page: 'kyc-verifications' },
  { 
    icon: Package, 
    label: 'Products', 
    hasDropdown: true, 
    isActive: false,
    subcategories: [{subLabel: 'Manage Products', page: 'products'}, {subLabel: 'Add Product', page: 'add-product'}]
  },
  { 
    icon: ShoppingCart, 
    label: 'Orders & Reviews', 
    hasDropdown: true, 
    isActive: false,
    subcategories: [{subLabel: 'All Orders', page: 'orders'}, {subLabel: 'Return Orders', page: 'return-orders'}, {subLabel: 'Reviews', page: 'reviews'}]
  },
  { 
    icon: TrendingUp, 
    label: 'Customers', 
    hasDropdown: true, 
    isActive: false,
    subcategories: [{subLabel: 'Customers Directory', page: 'customers-directory'}, {subLabel: 'Customers Analytics', page: 'customers-analytics'}, {subLabel: 'Customers Support', page: 'customers-support'}, {subLabel: 'Customers Communication', page: 'customers-communication'}]
  },
  { 
    icon: Store, 
    label: 'Data insights', 
    hasDropdown: true, 
    isActive: false,
    subcategories: [{subLabel: 'Business Overview', page: 'data-insights'}]
  },
  { 
    icon: DollarSign, 
    label: 'Income', 
    hasDropdown: true, 
    isActive: false,
    subcategories: [{subLabel: 'My Income', page: 'income'}]
  },
  // { 
  //   icon: HelpCircle, 
  //   label: 'Help Center', 
  //   hasDropdown: true, 
  //   isActive: false,
  //   subcategories: ['Documentation', 'Video Tutorials', 'Contact Support', 'Community Forum', 'FAQ']
  // },
  { 
    icon: Settings, 
    label: 'Settings', 
    hasDropdown: true, 
    isActive: false,
    subcategories: [{subLabel: 'Account Settings', page: 'account-setting'}, {subLabel: 'Admin Management', page: 'admin-management'}, {subLabel: 'Chat Settings', page: 'chat-settings'} ]
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onNavigate, currentPage  }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
  };

  return (
    <div className={`bg-white h-screen border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Lunio</h1>
              <p className="text-xs text-gray-500">Technologies Pvt Ltd</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedItems.includes(item.label);
          
          return (
            <div key={item.label}>
              <button
                onClick={() => item.hasDropdown ? toggleExpand(item.label) : handleNavigation(item.page)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  item.isActive 
                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${item.isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!isCollapsed && item.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  } ${item.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                )}
              </button>
              
              {/* Dropdown Content */}
              {!isCollapsed && item.hasDropdown && isExpanded && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.subcategories?.map((subcategory, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(subcategory.page)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        currentPage === subcategory.page
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {typeof subcategory === 'string' ? subcategory : subcategory.subLabel}
                    </button>
                  ))} 
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};