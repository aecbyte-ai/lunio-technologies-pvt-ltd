import React, { useState } from 'react'
import { Info } from 'lucide-react';
import CredentialModificationPopup from '../components/CredentialModificationPopup';


const Account_Setting = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Content */}
                <div className="flex-1 p-6">

                    {/* Page Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h1>

                    {/* Account Settings Content */}
                    <div className="space-y-8">
                        {/* Login Email Address */}
                        <div className="flex items-center justify-between py-4">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Login Email address</div>
                                <div className="text-base text-gray-900 font-medium">kimo.nep@gmail.com</div>
                            </div>
                            <button onClick={() => setIsPopupOpen(true)} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 hover:underline">
                                Modify
                            </button>
                        </div>

                        {/* Login Phone Number */}
                        <div className="flex items-center justify-between py-4">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Login Phone Number</div>
                                <div className="text-base text-gray-900 font-medium">+977 9863031260</div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 hover:underline">
                                Modify
                            </button>
                        </div>

                        {/* Password */}
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center">
                                <div>
                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                        Password
                                        <Info className="w-4 h-4 ml-1 text-gray-400" />
                                    </div>
                                    <div className="text-base text-gray-900 font-medium">******</div>
                                </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 hover:underline">
                                Modify
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white border-t border-gray-200 px-6 py-4 mt-auto">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Lumino Technologies 2024. All rights reserved.</span>
                        <span className="hover:text-gray-700 cursor-pointer transition-colors duration-200">Help Center</span>
                    </div>
                </div>
            </div>
            <CredentialModificationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    )
}

export default Account_Setting