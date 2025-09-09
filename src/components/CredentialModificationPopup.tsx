import React, { useState } from 'react';
import { X, Mail, Phone } from 'lucide-react';

interface EmailModificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CredentialModificationPopup: React.FC<EmailModificationModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  if (!isOpen) return null;

  const handleSendCode = () => {
    setCodeSent(true);
    // Simulate sending SMS code
    console.log('SMS verification code sent');
  };

  const handleNext = () => {
    if (currentStep === 1 && verificationCode.length >= 4) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = () => {
    console.log('Email modification completed with:', newEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Login Email address Modification
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center py-6 px-8">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className="mt-2 text-sm text-gray-600 text-center">
                <div className="font-medium">Please verify</div>
                <div>your account</div>
              </div>
            </div>
            
            <div className={`h-px w-12 ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className="mt-2 text-sm text-gray-600 text-center">
                <div className="font-medium">Change the</div>
                <div>email</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Current Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your current login phone
                </label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">+977 9863031260</span>
                </div>
              </div>

              {/* Verification Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Verification Code in SMS
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter the Code"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={6}
                  />
                  <button
                    onClick={handleSendCode}
                    disabled={codeSent}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      codeSent 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {codeSent ? 'Sent' : 'Send'}
                  </button>
                </div>
                {codeSent && (
                  <p className="text-sm text-green-600 mt-2">
                    Verification code sent to your phone
                  </p>
                )}
              </div>

              {/* Alternative Verification */}
              <div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm underline">Verify via login email address</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  New Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your new email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You will receive a verification email at your new address. 
                  Please verify it to complete the email change process.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          
          {currentStep === 1 ? (
            <button
              onClick={handleNext}
              disabled={verificationCode.length < 4}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                verificationCode.length >= 4
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!newEmail.includes('@')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                newEmail.includes('@')
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialModificationPopup;