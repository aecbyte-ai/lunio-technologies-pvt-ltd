import React, { useState } from 'react';
import {
    ChevronDown,
    MessageSquare,
} from 'lucide-react';

const QuickReply = () => {
    const [keywordMatching, setKeywordMatching] = useState(false);

    return (
        <div className="space-y-6">
            {/* Keyword Matching */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Keyword Matching</h2>
                        <p className="text-sm text-gray-500 mt-1">Turn on keyword matching to find saved quick replies more efficiently</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={keywordMatching}
                            onChange={(e) => setKeywordMatching(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                </div>
            </div>

            {/* Quick Reply Templates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Quick Reply Templates</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Quick reply messages can take care of frequently asked customer questions. You can speed up the process, cut down manual work, improve your shop's average response time, and boost conversation rates.
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors flex items-center">
                        Add Category
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No templates added</h3>
                    <div className="flex justify-center space-x-3 mt-6">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuickReply;