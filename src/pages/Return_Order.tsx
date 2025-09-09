import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, Info, ChevronDown, Check, Plus } from 'lucide-react';
import { sampleReturnOrders, getOrdersByStatus, getOrdersByTimeFilter } from '../Data/SampleReturnOrders';
import { ReturnOrder } from '../types/ReturnOrder';
import ReturnOrderTable from '../components/ReturnOrderTable';
// import ExportModal from './components/ExportModal';
import HistoryModal from '../components/HistoryLogReturnOrder';
import CreateOrderModal from '../components/CreateOrderPopup';

function Return_Order() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeTimeFilter, setActiveTimeFilter] = useState('Today');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<ReturnOrder[]>(sampleReturnOrders);
  const itemsPerPage = 10;

  const tabs = [
    { name: 'All', count: null },
    { name: 'Return Initiated', count: null },
    { name: 'Return in Progress', count: null, hasInfo: true },
    { name: 'QC in Progress', count: null, hasInfo: true },
    { name: 'Returned', count: null, hasDropdown: true, hasInfo: true },
    { name: 'Scrapped', count: null, hasInfo: true },
    { name: 'Cancelled', count: null, hasInfo: true }
  ];

  const timeFilters = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom'];

  // Filter orders based on active filters
  const filteredOrders = useMemo(() => {
    let filteredData = getOrdersByStatus(activeTab, orders);
    filteredData = getOrdersByTimeFilter(filteredData, activeTimeFilter);
    
    // Apply search filters
    if (searchOrderId) {
      filteredData = filteredData.filter(order => 
        order.orderId.toLowerCase().includes(searchOrderId.toLowerCase())
      );
    }
    
    if (searchPhone) {
      filteredData = filteredData.filter(order => 
        order.customerPhone.includes(searchPhone)
      );
    }
    
    return filteredData;
  }, [activeTab, activeTimeFilter, searchOrderId, searchPhone, orders]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleExport = (format: string, dateRange: string) => {
    console.log(`Exporting ${filteredOrders.length} orders as ${format} for ${dateRange} range`);
    // Simulate export
    alert(`Exported ${filteredOrders.length} orders as ${format.toUpperCase()} file`);
  };

  const handleRefundOnly = (orderId: string) => {
    console.log(`Processing refund only for order: ${orderId}`);
    alert(`Refund processed for order: ${orderId}`);
  };

  const handleReturnToWarehouse = (orderId: string) => {
    console.log(`Processing return to warehouse for order: ${orderId}`);
    alert(`Return to warehouse initiated for order: ${orderId}`);
  };

  const handleBulkReturnToWarehouse = () => {
    console.log('Processing bulk return to warehouse');
    alert(`Processing return to warehouse for ${filteredOrders.length} orders`);
  };

  const handleBulkRefundOnly = () => {
    console.log('Processing bulk refund only');
    alert(`Processing refund only for ${filteredOrders.length} orders`);
  };

  const handleCreateOrder = (newOrderData: Omit<ReturnOrder, 'id'>) => {
    const newOrder: ReturnOrder = {
      ...newOrderData,
      id: `RET${String(orders.length + 1).padStart(3, '0')}`
    };
    
    setOrders(prev => [newOrder, ...prev]);
    alert(`Return order ${newOrder.id} created successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Return Orders</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowCreateOrderModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Order
            </button>
            <button 
              onClick={handleBulkRefundOnly}
              className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors"
            >
              Refund Only
            </button>
          </div>
        </div>
      </div>

      {/* Green Notification Banner */}
      <div className="bg-green-100 border border-green-200 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <p className="text-sm text-green-700">
            Tell us more about your Return management experience with Lazada. Give your{' '}
            <span className="text-blue-500 underline cursor-pointer">feedback here!</span>
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.name
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              {tab.name}
              {tab.hasDropdown && <ChevronDown className="w-4 h-4" />}
              {tab.hasInfo && <Info className="w-4 h-4 text-gray-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-6">
        {/* Time Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveTimeFilter(filter);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                activeTimeFilter === filter
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Section */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="flex">
              <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">
                Order ID
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Please Input"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex">
              <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">
                Customer Phone
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Please Input"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-600">
            Page {currentPage}, {startIndex + 1} - {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} items
          </span>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setShowHistoryModal(true)}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              View history
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <ReturnOrderTable 
          orders={currentOrders}
          onRefundOnly={handleRefundOnly}
          onReturnToWarehouse={handleReturnToWarehouse}
        />

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 text-sm ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 text-sm ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      /> */}
      
      <HistoryModal 
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
      
      <CreateOrderModal 
        isOpen={showCreateOrderModal}
        onClose={() => setShowCreateOrderModal(false)}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
}

export default Return_Order;