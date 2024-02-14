import React, { useState, useEffect } from 'react';
import { BarChart, Wallet } from 'lucide-react';
import DashboardHome from './DashboardHome';
import TrainerNavbar from './TrainerNavabar';
import MyProfile from './MyProfile';
import PODetails from './PODetails';
import MyTrainings from './MyTrainings';


function TrainerDashboard() {
  const [email, setEmail] = useState(null);
  const [selectedLink, setSelectedLink] = useState('dashboard');

  useEffect(() => {
    // Parse the email from the URL
    const url = window.location.href;
    const emailStartIndex = url.lastIndexOf('/') + 1;
    const emailEndIndex = url.indexOf('@') + 1;
    const extractedEmail = url.slice(emailStartIndex, emailEndIndex);
    setEmail(extractedEmail + 'gmail.com'); // Append @gmail.com
  }, []);



  // Function to render the component based on the selected tab
  const renderComponent = () => {
    switch (selectedLink) {
      case 'dashboard':
        return <DashboardHome email={email}/>;
      case 'my-trainings':
        return <MyTrainings email={email}/>;
      case 'po-details':
        return <PODetails email={email}/>;
      case 'my-profile':
        return <MyProfile email={email}/>;
      default:
        return null;
    }
  };

  return (
    <>
    <TrainerNavbar/>
    <div className="flex h-screen">
      <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6">
          <div
              onClick={() => setSelectedLink('dashboard')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'dashboard' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </div>

            <div
              onClick={() => setSelectedLink('my-profile')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'my-profile' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">My Profile</span>
            </div>


            <div
              onClick={() => setSelectedLink('my-trainings')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'my-trainings' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">My Trainings</span>
            </div>

            <div
              onClick={() => setSelectedLink('po-details')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'po-details' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Purchase Order</span>
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        {renderComponent()}
      </main>
    </div>
    </>
  );
}

export default TrainerDashboard;