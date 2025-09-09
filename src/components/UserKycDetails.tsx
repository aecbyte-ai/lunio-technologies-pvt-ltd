import React from 'react';
import { X } from 'lucide-react';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    userId: string;
    email: string;
    phone: string;
    avatar: string;
  };
  applicationId: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedDate: string;
  onAccept: () => void;
  onReject: () => void;
}

const UserKycDetails: React.FC<UserDetailModalProps> = ({
  isOpen,
  onClose,
  user,
  applicationId,
  status,
  submittedDate,
  onAccept,
  onReject
}) => {
  if (!isOpen) return null;

  // Sample document images - in real app, these would come from the user data
  const documentImages = {
    front: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
    back: 'https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=400',
    selfie: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">KYC Application Details</h2>
            <p className="text-sm text-gray-600 mt-1">Application ID: {applicationId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* User Information */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-16 w-16">
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-xl font-medium text-orange-800">
                  {user.avatar}
                </span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">User ID</p>
                <p className="text-lg font-semibold text-gray-900">{user.userId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="text-lg text-gray-900">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Application Date</p>
                <p className="text-lg text-gray-900">{new Date(submittedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Status</p>
                <div className="flex items-center mt-1">
                  {status === 'pending' && (
                    <>
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                      <span className="text-lg text-orange-700 font-medium">Pending Review</span>
                    </>
                  )}
                  {status === 'accepted' && (
                    <>
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-lg text-blue-700 font-medium">Qualified</span>
                    </>
                  )}
                  {status === 'rejected' && (
                    <>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="text-lg text-yellow-700 font-medium">To Be Improved</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Documents Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Uploaded Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Document Front */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Document Front</h4>
              <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={documentImages.front}
                  alt="Document Front"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </div>
            </div>

            {/* Document Back */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Document Back</h4>
              <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={documentImages.back}
                  alt="Document Back"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </div>
            </div>

            {/* User Selfie */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">User Selfie</h4>
              <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={documentImages.selfie}
                  alt="User Selfie"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          {status === 'pending' && (
            <>
              <button
                onClick={onReject}
                className="px-6 py-3 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                Reject Application
              </button>
              <button
                onClick={onAccept}
                className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Accept Application
              </button>
            </>
          )}
          {status === 'accepted' && (
            <button
              onClick={onReject}
              className="px-6 py-3 text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors font-medium"
            >
              Change to Rejected
            </button>
          )}
          {status === 'rejected' && (
            <button
              onClick={onAccept}
              className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Change to Accepted
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserKycDetails;