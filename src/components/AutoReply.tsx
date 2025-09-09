import React, { useState } from 'react';
import {
    ChevronRight,
    MessageSquare,
    ChevronLeft
} from 'lucide-react';

const AutoReply = () => {
    const [welcomeMessage, setWelcomeMessage] = useState(true);
    const [messageContent, setMessageContent] = useState('');
    const [activeWelcomeTab, setActiveWelcomeTab] = useState('Welcome Message');
    return (
        <div className="space-y-6">
            {/* Welcome Message Tab */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {['Welcome Message', 'Product Card FAQ', 'Order Card FAQ'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveWelcomeTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeWelcomeTab === tab
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <MessageSquare className="w-5 h-5 text-purple-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Welcome Message</h2>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={welcomeMessage}
                                onChange={(e) => setWelcomeMessage(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Buyer will receive an automatic message when they initiate a conversation with you.
                    </p>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-medium text-gray-900">Message Content</h3>
                            <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
                                Message Setting
                            </button>
                        </div>

                        <div className="border border-gray-300 rounded-md">
                            <textarea
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                className="w-full h-32 p-4 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
                                placeholder="Enter your welcome message..."
                            />
                            <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t border-gray-300">
                                <span className="text-xs text-gray-500">0/1000</span>
                                <div className="flex items-center space-x-2">
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="text-xs text-gray-500">Previous</span>
                                    <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">1</span>
                                    <span className="text-xs text-gray-500">Next</span>
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Action List */}
                    <div className="mb-6">
                        <h3 className="text-base font-medium text-gray-900 mb-4">Active Action List</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Keywords</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Action Content</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Click Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 px-4 text-sm text-gray-900">
                                            We're offering exclusive deals and discounts on our own website! 🛒 Visit www.lunio.com.np for better offers and more products – with no extra Daraz commission added!
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm font-medium text-gray-900">Follow Invitation</div>
                                            <div className="text-sm text-gray-500">We're offering exclusive deals and discounts on our own website! 🛒 Visit www.lunio.com.np for better offers and more products – with no extra Daraz commission added!</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-lg font-bold text-gray-900">60%</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Offline Auto Reply */}
                    <div>
                        <h3 className="text-base font-medium text-gray-900 mb-4">Offline Auto Reply</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Outside Working Hours</h4>
                                <p className="text-sm text-gray-500 mb-3">
                                    Customers will receive automatic reply when they contact you outside working hours
                                </p>
                                <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                                    Edit Messages &gt;
                                </button>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Holiday Mode</h4>
                                <p className="text-sm text-gray-500 mb-3">
                                    Customers will receive automatic reply when they contact you during store holiday
                                </p>
                                <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                                    Edit Messages &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutoReply