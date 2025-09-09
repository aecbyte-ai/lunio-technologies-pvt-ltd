import React, { useState } from 'react';
import { MoreHorizontal, FileText, CreditCard, MapPin, Car, File, Download, ChevronDown, Search } from 'lucide-react';
import UserKycDetails from './UserKycDetails';

interface KYCApplication {
    id: string;
    applicationId: string;
    user: {
        name: string;
        userId: string;
        email: string;
        phone: string;
        avatar: string;
    };
    documents: string[];
    status: 'pending' | 'accepted' | 'rejected';
    submittedDate: string;
}

interface KYCTableProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
    tabCounts: {
        all: number;
        accepted: number;
        pending: number;
        rejected: number;
    };
    onUpdateTabCounts: (newCounts: {
        all: number;
        accepted: number;
        pending: number;
        rejected: number;
    }) => void;
    applications: KYCApplication[];
    onUpdateApplications: (applications: KYCApplication[]) => void;
}

const KYCTable: React.FC<KYCTableProps> = ({
    activeTab,
    onTabChange,
    tabCounts,
    onUpdateTabCounts,
    applications,
    onUpdateApplications
}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<KYCApplication | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterApplication, setFilterApplication] = useState('All');
    const [verificationType, setVerificationType] = useState('All Types');
    const [sortBy, setSortBy] = useState('Date Applied');

    // Filter applications based on active tab
    const filteredApplications = applications.filter(app => {
        if (activeTab === 'all') return true;
        return app.status === activeTab;
    });

    const getDocumentIcon = (docType: string) => {
        switch (docType) {
            case 'aadhaar':
                return <FileText size={16} className="text-blue-600" />;
            case 'pan':
                return <CreditCard size={16} className="text-green-600" />;
            case 'passport':
                return <MapPin size={16} className="text-purple-600" />;
            case 'driving_license':
                return <Car size={16} className="text-orange-600" />;
            default:
                return <File size={16} className="text-gray-600" />;
        }
    };

    const getDocumentName = (docType: string) => {
        switch (docType) {
            case 'aadhaar':
                return 'Aadhaar Card';
            case 'pan':
                return 'PAN Card';
            case 'passport':
                return 'Passport';
            case 'driving_license':
                return 'Driving License';
            default:
                return 'Document';
        }
    };

    const handleAccept = (applicationId: string) => {
        const updatedApplications = applications.map(app =>
            app.id === applicationId
                ? { ...app, status: 'accepted' as const }
                : app
        );
        onUpdateApplications(updatedApplications);

        // Calculate and update tab counts immediately
        const newTabCounts = {
            all: updatedApplications.length,
            accepted: updatedApplications.filter(app => app.status === 'accepted').length,
            pending: updatedApplications.filter(app => app.status === 'pending').length,
            rejected: updatedApplications.filter(app => app.status === 'rejected').length,
        };
        onUpdateTabCounts(newTabCounts);

        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleReject = (applicationId: string) => {
        const updatedApplications = applications.map(app =>
            app.id === applicationId
                ? { ...app, status: 'rejected' as const }
                : app
        );
        onUpdateApplications(updatedApplications);

        // Calculate and update tab counts immediately
        const newTabCounts = {
            all: updatedApplications.length,
            accepted: updatedApplications.filter(app => app.status === 'accepted').length,
            pending: updatedApplications.filter(app => app.status === 'pending').length,
            rejected: updatedApplications.filter(app => app.status === 'rejected').length,
        };
        onUpdateTabCounts(newTabCounts);

        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const openUserDetail = (application: KYCApplication) => {
        setSelectedUser(application);
        setIsModalOpen(true);
    };

    const openEditModal = (application: KYCApplication) => {
        setSelectedUser(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const toggleSelection = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Filter Application Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter Application
                        </label>
                        <div className="relative">
                            <select
                                value={filterApplication}
                                onChange={(e) => setFilterApplication(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                            >
                                <option>All</option>
                                <option>Pending</option>
                                <option>Accepted</option>
                                <option>Rejected</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Applications
                        </label>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by User Name / User ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    {/* Verification Type Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Verification Type
                        </label>
                        <div className="relative">
                            <select
                                value={verificationType}
                                onChange={(e) => setVerificationType(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                            >
                                <option>All Types</option>
                                <option>Aadhaar</option>
                                <option>PAN</option>
                                <option>Passport</option>
                                <option>Driving License</option>
                                <option>Others</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort By
                        </label>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                            >
                                <option>Date Applied</option>
                                <option>Status</option>
                                <option>Name</option>
                                <option>User ID</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => setSelectAll(e.target.checked)}
                            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">
                            Select all applications
                        </span>
                    </div>

                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                        <Download size={16} />
                        <span>Export Selected Applications</span>
                    </button>
                </div>
            </div>


            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Info
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Application ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submitted Documents
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(app.id)}
                                            onChange={() => toggleSelection(app.id)}
                                            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                                        />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 -m-2 transition-colors"
                                            onClick={() => openUserDetail(app)}
                                        >
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-orange-800">
                                                        {app.user.avatar}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {app.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    User ID: {app.user.userId}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {app.user.email} • {app.user.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {app.applicationId}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {app.documents.map((doc, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                                    title={getDocumentName(doc)}
                                                >
                                                    {getDocumentIcon(doc)}
                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        {getDocumentName(doc)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {app.status === 'pending' && (
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleAccept(app.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(app.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {app.status === 'accepted' && (
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                                <span className="text-sm text-blue-700 font-medium">Qualified</span>
                                            </div>
                                        )}
                                        {app.status === 'rejected' && (
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                                                <span className="text-sm text-yellow-700 font-medium">To Be Improved</span>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => openEditModal(app)}
                                                className="text-orange-600 hover:text-orange-900 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedUser && (
                    <UserKycDetails
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        user={applications.find(app => app.id === selectedUser.id)?.user || selectedUser.user}
                        applicationId={applications.find(app => app.id === selectedUser.id)?.applicationId || selectedUser.applicationId}
                        status={applications.find(app => app.id === selectedUser.id)?.status || selectedUser.status}
                        submittedDate={applications.find(app => app.id === selectedUser.id)?.submittedDate || selectedUser.submittedDate}
                        onAccept={() => handleAccept(selectedUser.id)}
                        onReject={() => handleReject(selectedUser.id)}
                    />
                )}

                {/* Pass navigation props */}
            </div>
        </>
    );
};

export default KYCTable;