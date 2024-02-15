// import React, { useState, useEffect } from 'react';
// import BusinessRequestForm from './BusinessRequestForm';
// import FeedbackForm from './FeedbackForm'; // Import your FeedbackForm component
// import Profile from './MyProfile';

// const BusinessDashboard = () => {
//   const [showBusinessRequestForm, setShowBusinessRequestForm] = useState(false);
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [companyUniqueId, setCompanyUniqueId] = useState('');

//   useEffect(() => {
//     const storedCompanyId = localStorage.getItem('companyId');
//     if (storedCompanyId) {
//       setCompanyUniqueId(storedCompanyId);
//     }
//   }, []);

//   const handleBusinessRequestClick = () => {
//     setShowBusinessRequestForm(true);
//     setShowFeedbackForm(false); // Hide feedback form if it's shown
//   };

//   const handleFeedbackFormClick = () => {
//     setShowFeedbackForm(true);
//     setShowBusinessRequestForm(false); // Hide business request form if it's shown
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/4 bg-gray-200">
//         <div className="p-4">
//           <ul>
//             <li className="mb-4">
//               <a href="#" className="text-blue-600">Dashboard</a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="text-blue-600" onClick={handleBusinessRequestClick}>Business Request</a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="text-blue-600">Current Trainings</a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="text-blue-600">Invoices</a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="text-blue-600" onClick={handleFeedbackFormClick}>Feedback</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="flex-1 bg-gray-100">
//         <div className="p-4">
//           <div className="flex justify-between mb-4">
//             {/* Navbar content goes here */}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Grid content goes here */}
//           </div>

//           {/* Display Business Request Form if showBusinessRequestForm is true */}
//           {showBusinessRequestForm && (
//             <div className="mt-4">
//               <BusinessRequestForm companyUniqueId={companyUniqueId} />
//             </div>
//           )}

//           {/* Display Feedback Form if showFeedbackForm is true */}
//           {showFeedbackForm && (
//             <div className="mt-4">
//               {/* Pass any necessary props to FeedbackForm */}
//               <FeedbackForm />
//             </div>
//           )}
//         </div>
//       </div>
//       <Profile/>
//     </div>
//   );
// };

// export default BusinessDashboard;


// NEW DASHBOARD (ABSHAR)

import React, { useState, useEffect } from 'react';
import { BarChart, Wallet } from 'lucide-react';
import BusinessRequestForm from './BusinessRequestForm';
import DashboardHome from './DashboardHome';
import MyProfile from './MyProfile';
import BusinessNavbar from './BusinessNavbar';
import {CurrentTrainings} from './CurrentTrainings';
import {PastTrainings} from './PastTrainings';
import Invoices from './Invoices';
import FeedbackForm from './FeedbackForm';

function BusinessDashboard() {
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
      case 'my-profile':
        return <MyProfile email={email}/>;
      case 'trainer-request':
        return <BusinessRequestForm email={email}/>;
      case 'current-trainings':
        return <CurrentTrainings email={email}/>;
      case 'past-trainings':
          return <PastTrainings email={email}/>;
      case 'invoices':
          return <Invoices email={email}/>;  
      case 'feedback':
            return <FeedbackForm email={email}/>;  
      default:
        return null;
    }
  };
 
  return (
    <>
    <BusinessNavbar/>
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
              onClick={() => setSelectedLink('trainer-request')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'trainer-request' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Trainer Request</span>
            </div>
 
            <div
              onClick={() => setSelectedLink('current-trainings')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'current-trainings' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Current Trainings</span>
            </div>

            <div
              onClick={() => setSelectedLink('past-trainings')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'past-trainings' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Past Trainings</span>
            </div>

            <div
              onClick={() => setSelectedLink('invoices')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'invoices' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Invoices</span>
            </div>

            <div
              onClick={() => setSelectedLink('feedback')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'feedback' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Feedback</span>
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
 
export default BusinessDashboard;