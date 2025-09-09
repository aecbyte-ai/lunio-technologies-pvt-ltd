import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { NotificationCard } from './components/NotificationCard';
import { OrderStats } from './components/OrderStats';
import { CampaignEvents } from './components/CampaignEvents';
import { PopularToolkit } from './components/PopularToolkit';
import Manage_Products from './pages/Manage_Products';
import MyIncome from './pages/My_Income';
import IncomeOverview from './components/Income_overview';
import Order_Management from './pages/Order_Management';
import Reviews from './pages/Reviews';
import Chat_Setting from './pages/Chat_Setting';
import { Customer } from './pages/Customer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import AddProductPage from './pages/Add_Product';
import { CustomerDirectory } from './components/CustomerDirectory';
import AdminManagement from './components/AdminManagement';
import Account_Setting from './pages/Account_Setting';
import LoginPage from './pages/Login_Page'
import Business_Overview from './pages/Business_Overview';
import Kyc_Verifications from './pages/Kyc_Verifications';
import Return_Order from './pages/Return_Order';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'customers':
      case 'customers-directory':
      case 'customers-analytics':
      case 'customers-segmentation':
      case 'customers-support':
      case 'customers-communication':
        return <Customer initialView={currentPage} />;
      case 'products':
        return <Manage_Products />;
      case 'add-product':
        return <AddProductPage />;
      case 'income':
        return <MyIncome />;
      case 'orders':
        return <Order_Management />;
      case 'return-orders':
        return <Return_Order />
      case 'reviews':
        return <Reviews />;
      case 'chat-settings':
        return <Chat_Setting />;
      case 'kyc-verifications':
        return <Kyc_Verifications />
      case 'dashboard':
        return <Dashboard />;
      case 'data-insights':
        return <Business_Overview />;
      case 'account-setting':
        return <Account_Setting />;
      case 'admin-management':
        return <AdminManagement />;
      default:
        return <Business_Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onNavigate={setCurrentPage}/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
           {renderCurrentPage()}

            {/* <NotificationCard />
            <OrderStats />
            <CampaignEvents />
            <PopularToolkit /> */}

            {/* <Dashboard /> */}
            {/* <Manage_Products /> */}
            {/* <MyIncome /> */}
            {/* <Order_Management /> */}
            {/* <Reviews /> */}
            {/* <Chat_Setting /> */}
            {/* <Customer /> */}
            {/* <AddProductPage /> */}
            {/* <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kyc-verifications" element={<Dashboard />} />
                <Route path="/products" element={<Manage_Products />} />
                <Route path="/add-product" element={<Dashboard />} />
                <Route path="/orders" element={<Order_Management />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/income" element={<MyIncome />} />
                <Route path="/chat-settings" element={<Chat_Setting />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router> */}
        </main>
      </div>
    </div>
  );
}

export default App;