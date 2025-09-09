import React from 'react';

import { 
  Bell, 
  BarChart3,
  MessageSquare,
  ExternalLink,
  HelpCircle,
  Star,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  FileText,
  MessageCircle
} from 'lucide-react';

const Reviews = () => {

    const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
  return (
     <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews Management</h1>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="text-orange-600 text-sm">
                  You have <span className="font-semibold">5 products</span> that need attention
                </div>
                <button className="ml-auto text-orange-600 hover:text-orange-700">
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">To be Reviewed</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">41</div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600">New today: 5</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">Expire today: 6</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Pending Reply to Reviews</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">54%</div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-red-600">Were already been replied</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">New today: 8</div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Product with Review Coverage</div>
                <div className="text-3xl font-bold text-orange-500 mb-2">22.0%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Positive Seller Rating</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">54%</div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600">Target Rate: 95.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tools</h2>
            <div className="text-sm text-gray-600 mb-4">Quick tools to help you manage and increase reviews for your store</div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-medium">Quick Reply</span>
                </div>
                <div className="text-sm text-gray-600">Quick reply to your reviews</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-medium">Review Analysis Center</span>
                </div>
                <div className="text-sm text-gray-600">Analyze your reviews and improve better</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <ExternalLink className="w-5 h-5 text-purple-500 mr-2" />
                  <span className="font-medium">External Review</span>
                </div>
                <div className="text-sm text-gray-600">Manage most hot reviews to your store</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <HelpCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="font-medium">Customer Question</span>
                </div>
                <div className="text-sm text-gray-600">Check and answer the questions from customers</div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex border-b border-gray-200 mb-6">
              <button className="px-4 py-2 text-orange-500 border-b-2 border-orange-500 font-medium">
                Products Review Detail
              </button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                To Be Received
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Replied</option>
                  <option>No Reply</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    With Content
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    With Image or Video
                  </button>
                </div>
              </div>

              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                    >
                      {rating} star
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Quality</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Service</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seller Service</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Reviews Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">0 Selected</span>
                <span className="text-sm text-gray-600">Bulk Reply(0)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Quality</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            Order: 212637712752074
                          </div>
                          <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            Ankit Bhatia
                          </div>
                          <div className="text-sm text-gray-500">Created: 30 Jul 2025</div>
                          <div className="text-sm text-gray-500">Modified: 01 Aug 2025</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-gray-600">Overall Rating:</div>
                          <StarRating rating={5} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Product Quality:</div>
                          <StarRating rating={5} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Shipping Service:</div>
                          <StarRating rating={5} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Seller Service:</div>
                          <StarRating rating={5} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">ApeUni PTE - Exam 30 days</div>
                          <div className="text-sm text-gray-500">ID: 124424477</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                        Reply
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            Order: 212417270888678
                          </div>
                          <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            9806624396
                          </div>
                          <div className="text-sm text-gray-500">Created: 22 Jul 2025</div>
                          <div className="text-sm text-gray-500">Modified: 22 Jul 2025</div>
                          <div className="mt-2 text-sm text-gray-700">
                            process is super fast under a minute it's done, it's more cheaper on their website, so first check out their website for more affordable price
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            Thank you so much sir 🙏
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-gray-600">Overall Rating:</div>
                          <StarRating rating={5} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Product Quality:</div>
                          <StarRating rating={5} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Shipping Service:</div>
                          <StarRating rating={5} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Seller Service:</div>
                          <StarRating rating={5} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">ApeUni PTE - Exam 30 days</div>
                          <div className="text-sm text-gray-500">ID: 124424477</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <button className="block px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                          Reply
                        </button>
                        <button className="block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Hide Reply
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
                  <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">2</button>
                  <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">3</button>
                  <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">4</button>
                  <span className="px-3 py-1 text-gray-500">...</span>
                  <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">6</button>
                </div>
                <button className="flex items-center px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  {"Next >>"}
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">1/6</span>
                <span className="text-sm text-gray-600">Go to</span>
                <input
                  type="number"
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  defaultValue="1"
                />
                <span className="text-sm text-gray-600">Page</span>
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded text-sm">
                  View
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reviews