import React, { useState } from 'react'
import KYCTable from '../components/KYCTable';
import NavigationTabs from '../components/KycNavigationTabs';


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




const Kyc_Verifications = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [applications, setApplications] = useState<KYCApplication[]>([
        {
            id: '1',
            applicationId: 'KYC-784562',
            user: {
                name: 'John Doe',
                userId: '4586209',
                email: 'john.doe@email.com',
                phone: '+91 98765 43210',
                avatar: 'JD'
            },
            documents: ['aadhaar', 'pan', 'passport'],
            status: 'pending',
            submittedDate: '2024-01-15'
        },
        {
            id: '2',
            applicationId: 'KYC-784563',
            user: {
                name: 'Sarah Wilson',
                userId: '4586210',
                email: 'sarah.wilson@email.com',
                phone: '+91 98765 43211',
                avatar: 'SW'
            },
            documents: ['aadhaar', 'pan'],
            status: 'pending',
            submittedDate: '2024-01-14'
        },
        {
            id: '3',
            applicationId: 'KYC-784564',
            user: {
                name: 'Mike Chen',
                userId: '4586211',
                email: 'mike.chen@email.com',
                phone: '+91 98765 43212',
                avatar: 'MC'
            },
            documents: ['aadhaar', 'driving_license'],
            status: 'pending',
            submittedDate: '2024-01-13'
        }
    ]);
    const [tabCounts, setTabCounts] = useState({
        all: applications.length,
        accepted: 0,
        pending: applications.length,
        rejected: 0,
    });
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const updateTabCounts = (newCounts: typeof tabCounts) => {
        setTabCounts(newCounts);
    };
    return (
        <>
        <NavigationTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabCounts={tabCounts}
        />
        <KYCTable
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabCounts={tabCounts}
            onUpdateTabCounts={updateTabCounts}
            applications={applications}
            onUpdateApplications={setApplications}
        />

        </>
    )
}

export default Kyc_Verifications