import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 
const DashboardHome = () => {
  const { email: businessEmail } = useParams();
  const [invoices, setInvoices] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/invoices/${businessEmail}`);
        
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
 
    fetchData();
  }, [businessEmail]);
  
  return (

    <>

<div className="container mx-auto my-5">
      <h2 className="text-3xl font-semibold mb-4"><center>Dashboard of {businessEmail} </center></h2>
      </div>
    
        {/* Main Content */}
       <div className="flex-1 bg-gray-100">
         <div className="p-4">
         
           {/* Grid Layout */}
           <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 shadow-md">
               <h2 className="text-lg font-semibold mb-2">No of Invoice Request</h2>
               <p className="text-gray-700">10</p>
             </div>
             <div className="bg-white p-4 shadow-md">
               <h2 className="text-lg font-semibold mb-2">Current Trainings</h2>
               <p className="text-gray-700">5</p>
             </div>
           </div>
         </div>
       </div>
 
    </>
  )
}
 
export default DashboardHome;

