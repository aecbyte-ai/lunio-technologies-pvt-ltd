import React, { useState } from 'react';
import { 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  Copy,
  Printer,
  Search
} from 'lucide-react';

const Order_Management = () => {

    const [activeTab, setActiveTab] = useState('all');
    const [activeTimeFilter, setActiveTimeFilter] = useState('today');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    const tabs = [
        { id: 'all', label: 'All', count: null },
        { id: 'unpaid', label: 'Unpaid', count: null },
        { id: 'toship', label: 'To Ship', count: null },
        { id: 'shipping', label: 'Shipping', count: null },
        { id: 'delivered', label: 'Delivered', count: null },
        { id: 'failed', label: 'Failed Delivery', count: null },
        { id: 'cancellation', label: 'Cancellation', count: null },
        { id: 'return', label: 'Return or Refund', count: null }
    ];

    const timeFilters = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom'];

    const orders = [
        {
            id: '212728147365261',
            customer: 'Sapan Pokhrel',
            items: 1,
            product: 'Unipin BD 2000 UC',
            price: 'Rs. 2,699',
            quantity: 1,
            sku: '437800391-1752572865237-0',
            warehouse: 'dropshipping',
            totalAmount: 'Rs 2,699.00',
            delivery: 'Digital',
            status: 'Cancelled',
            statusColor: 'text-red-600',
            createTime: '08 Aug 2025 10:11',
            cancelReason: '[System] Payment unsuccessful - time limit reached',
            cancelTime: '08 Aug 2025 10:11'
        },
        {
            id: '212717548349160',
            customer: 'Kastup Koirala',
            items: 1,
            product: 'Unipin BD 2000 UC',
            price: 'Rs. 2,699',
            quantity: 1,
            sku: '437800391-1752572865237-0',
            warehouse: 'dropshipping',
            totalAmount: 'Rs 2,699.00',
            delivery: 'Digital',
            status: 'Cancelled',
            statusColor: 'text-red-600',
            createTime: '07 Aug 2025 10:11',
            cancelReason: '[System] Payment unsuccessful - time limit reached',
            cancelTime: '07 Aug 2025 23:06'
        },
        {
            id: '212717548349160',
            customer: 'Kastup Koirala',
            items: 1,
            product: 'Unipin BD 2000 UC',
            price: 'Rs. 2,800',
            quantity: 1,
            sku: '437800391-1752572865237-0',
            warehouse: 'dropshipping',
            totalAmount: 'Rs 2,800.00',
            delivery: 'Digital',
            status: 'Delivered',
            statusColor: 'text-green-600',
            createTime: '07 Aug 2025 10:11'
        }
    ];

    const toggleOrderSelection = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex">

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-6">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Order Management</h1>

                        {/* Info Banner */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                            <Info className="text-blue-600 flex-shrink-0" size={20} />
                            <span className="text-blue-800 text-sm">
                                You have <span className="font-semibold">24 new cancelled order(s)</span> in last 7 days.
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                        <div className="flex space-x-8 min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-3 border-b-2 transition-colors whitespace-nowrap text-sm ${activeTab === tab.id
                                            ? 'border-orange-500 text-orange-600 font-medium'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="space-y-4 mb-6">
                        {/* Date Filters */}
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-sm text-gray-700 font-medium">Order Date:</span>
                            <div className="flex flex-wrap gap-2">
                                {timeFilters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveTimeFilter(filter.toLowerCase().replace(' ', ''))}
                                        className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${activeTimeFilter === filter.toLowerCase().replace(' ', '')
                                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-1.5">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-500">Start Date</span>
                                </div>
                                <span className="text-gray-400">-</span>
                                <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-1.5">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-500">End Date</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Type Filter */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700 font-medium">Order Type:</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-orange-500 text-white rounded-md text-sm font-medium">
                                    All
                                </button>
                                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors">
                                    Normal
                                </button>
                            </div>
                        </div>

                        {/* Search Fields */}
                        <div className="flex flex-wrap gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Order Number"
                                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Copy className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tracking Number"
                                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Copy className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                    <option>More</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Table Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-600">Page 1, 1 - 20 of 1025 items</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                    <option>Export</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                    <option>Newest Order Created</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                            <div className="col-span-1">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </div>
                            <div className="col-span-3">Product</div>
                            <div className="col-span-2">Total Amount</div>
                            <div className="col-span-2">Delivery</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Actions</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <div key={`${order.id}-${index}`} className="px-6 py-4">
                                    {/* Customer Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={selectedOrders.includes(`${order.id}-${index}`)}
                                                onChange={() => toggleOrderSelection(`${order.id}-${index}`)}
                                            />
                                            <span className="font-medium text-gray-900">{order.customer}</span>
                                            <span className="text-sm text-gray-500">({order.items} item)</span>
                                        </div>
                                        <div className="text-right text-sm text-gray-600">
                                            <div>Order Number: <span className="text-blue-600">{order.id}</span></div>
                                            <div>Create Time: {order.createTime}</div>
                                        </div>
                                    </div>

                                    {/* Product Row */}
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-1"></div>
                                        <div className="col-span-3 flex items-center space-x-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <img
                                                    src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop"
                                                    alt="Product"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{order.product}</div>
                                                <div className="text-sm text-gray-500">{order.price} × {order.quantity}</div>
                                                <div className="text-xs text-gray-400">Seller SKU: {order.sku}</div>
                                                <div className="text-xs text-gray-400">Warehouse: {order.warehouse}</div>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="font-medium text-gray-900">{order.totalAmount}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {order.delivery}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <div className={`font-medium ${order.statusColor}`}>{order.status}</div>
                                            {order.status === 'Cancelled' && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    <div>Cancel Reason: [System]</div>
                                                    <div>Payment unsuccessful -</div>
                                                    <div>time limit reached</div>
                                                    <div>Cancel Time: {order.cancelTime}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-span-2">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                        <span className="text-xs text-gray-600">AWB</span>
                                                    </button>
                                                    <Copy size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button className="flex items-center space-x-1 px-3 py-1 border border-orange-500 text-orange-600 rounded-md text-sm hover:bg-orange-50 transition-colors">
                                                    <Printer size={14} />
                                                    <span>Print Invoice</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <div className="flex items-center space-x-1">
                                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                        <span className="text-xs text-gray-600">Invoice</span>
                                                    </button>
                                                    <Copy size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button className="flex items-center space-x-1 px-3 py-1 border border-orange-500 text-orange-600 rounded-md text-sm hover:bg-orange-50 transition-colors">
                                                    <span>More Actions</span>
                                                    <ChevronDown size={14} />
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <div className="flex items-center space-x-1">
                                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                        <span className="text-xs text-gray-600">Pick List</span>
                                                    </button>
                                                    <Copy size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <ChevronLeft size={16} className="text-gray-600" />
                            </button>
                            <span className="text-sm text-gray-600">Previous</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="w-8 h-8 bg-orange-500 text-white rounded-md text-sm font-medium">1</button>
                            <button className="w-8 h-8 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">2</button>
                            <button className="w-8 h-8 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">3</button>
                            <button className="w-8 h-8 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">4</button>
                            <span className="text-gray-400">...</span>
                            <button className="w-8 h-8 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">52</button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Next</span>
                            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <ChevronRight size={16} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 space-y-4 sm:space-y-0 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                            <span>1/52</span>
                            <span>Go to</span>
                            <input
                                type="text"
                                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <span>Page</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>View</span>
                            <span>Items per page:</span>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                                <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Order_Management