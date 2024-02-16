import React, { useState, useEffect } from 'react';
import { BarChart, Trash } from 'lucide-react';
import DashboardHome from './DashboardHome';
import TrainerNavbar from './TrainerNavabar';
import MyProfile from './MyProfile';
import PODetails from './PODetails';
import MyTrainings from './MyTrainings';
import { useNavigate } from 'react-router-dom';



function TrainerDashboard() {
  const [email, setEmail] = useState(null);
  const [selectedLink, setSelectedLink] = useState('dashboard');
  const navigate = useNavigate();


  useEffect(() => {
    // Parse the email from the URL
    const url = window.location.href;
    const emailStartIndex = url.lastIndexOf('/') + 1;
    const emailEndIndex = url.indexOf('@') + 1;
    const extractedEmail = url.slice(emailStartIndex, emailEndIndex);
    setEmail(extractedEmail + 'gmail.com'); // Append @gmail.com
  }, []);


  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3001/trainer/${email}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirect or handle deletion success as needed
        alert('Account deleted successfully');
        navigate('/sign-in')
      } else {
        console.error('Error deleting account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };



  // Function to render the component based on the selected tab
  const renderComponent = () => {
    switch (selectedLink) {
      case 'dashboard':
        return <DashboardHome email={email} setSelectedLink= {setSelectedLink} />;
      case 'my-trainings':
        return <MyTrainings email={email} />;
      case 'po-details':
        return <PODetails email={email} />;
      case 'my-profile':
        return <MyProfile email={email} />;
      default:
        return null;
    }
  };

  return (
    <>
      <TrainerNavbar />
      <div className="flex h-screen">
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6">
              <div
                onClick={() => setSelectedLink('dashboard')}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${selectedLink === 'dashboard' ? 'bg-gray-100 text-gray-700' : ''
                  }`}
              >

                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </div>

              <div
                onClick={() => setSelectedLink('my-profile')}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${selectedLink === 'my-profile' ? 'bg-gray-100 text-gray-700' : ''
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                <span className="mx-2 text-sm font-medium">My Profile</span>
              </div>


              <div
                onClick={() => setSelectedLink('my-trainings')}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${selectedLink === 'my-trainings' ? 'bg-gray-100 text-gray-700' : ''
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
                <span className="mx-2 text-sm font-medium">My Trainings</span>
              </div>

              <div
                onClick={() => setSelectedLink('po-details')}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${selectedLink === 'po-details' ? 'bg-gray-100 text-gray-700' : ''
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>
                <span className="mx-2 text-sm font-medium">Purchase Order</span>
              </div>

              <div
                onClick={() => setSelectedLink('deleteAccount')}
                className={`flex transform items-center rounded-lg px-3 py-2 text-red-500 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${selectedLink === 'deleteAccount' ? 'bg-gray-100 text-gray-700' : ''
                  }`}
              >
                <Trash className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2  text-sm font-medium cursor-pointer">Delete My Account</span>
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {selectedLink === 'deleteAccount' ? (
            <div>
              <p>Are you sure you want to delete your account?</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </button>
            </div>
          ) : (
            renderComponent()
          )}
        </main>
      </div>
    </>
  );
}

export default TrainerDashboard;