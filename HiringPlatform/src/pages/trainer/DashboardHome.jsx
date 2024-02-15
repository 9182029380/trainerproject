// import React from 'react'

// const DashboardHome = () => {
//   return (
//     <>
//         {/* Main Content */}
//        <div className="flex-1 bg-gray-100">
//          <div className="p-4">
          
//            {/* Grid Layout */}
//            <div className="grid grid-cols-2 gap-4">
//              <div className="bg-white p-4 shadow-md">
//                <h2 className="text-lg font-semibold mb-2">No of PO Requests</h2>
//                <p className="text-gray-700">10</p>
//              </div>
//              <div className="bg-white p-4 shadow-md">
//                <h2 className="text-lg font-semibold mb-2">Current Trainings</h2>
//                <p className="text-gray-700">5</p>
//              </div>
//            </div>``
//          </div>
//        </div> 

//     </>
//   )
// }

// export default DashboardHome;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const DashboardHome = ({ email }) => {
  const [count, setCount] = useState(null);
  const [totalTrainings, setTotalTrainings] = useState(null);
  const [currentTrainings, setCurrentTrainings] = useState([]);
  const [emailId, setEmailId] = useState(email);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total purchase orders count
        const responseCount = await axios.get(`http://localhost:3001/purchase-orders/count/${emailId}`);
        setCount(responseCount.data.count);
 
        // Fetch total trainers count
        const responseTotalTrainings = await axios.get(`http://localhost:3001/total-trainers/${emailId}`);
        setTotalTrainings(responseTotalTrainings.data.count);
 
        // Fetch current trainings
        const responseCurrentTrainings = await axios.get(`http://localhost:3001/current-trainings/${emailId}`);
        setCurrentTrainings(responseCurrentTrainings.data.currentTrainings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [emailId]);
 
  useEffect(() => {
    setEmailId(email);
  }, [email]);
 
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-[300px] rounded-md border shadow-md ml-[10%] mt-10">
        <div className="p-4">
          <h1 className="text-lg font-semibold">TOTAL PURCHASE ORDERS</h1>
          <p className="mt-3 text-gray-600 text-center text-7xl font-bold">{count}</p>
          <button type="button" className="mt-4 ml-[60%] font-semibold text-black hover:bg-gray-300">
            Know More..
          </button>
        </div>
      </div>
      <div className="w-full md:w-[300px] rounded-md border shadow-md ml-[15%] mt-10">
        <div className="p-4">
          <h1 className="text-lg font-semibold">TOTAL TRAININGS</h1>
          <p className="mt-3 text-gray-600 text-center text-7xl font-bold">{totalTrainings}</p>
          <button type="button" className="mt-4 ml-[60%] font-semibold text-black hover:bg-gray-300">
            Know More..
          </button>
        </div>
      </div>
      <div className="w-[900px]  rounded-md border shadow-md ml-5 mt-10">
        <div className="p-4">
          <h1 className="text-lg font-semibold">CURRENT TRAININGS</h1>
          {currentTrainings.length === 0 ? (
            <p className="mt-3 text-gray-600 text-center">No trainings are currently going on</p>
          ) : (
            <table className="mt-3 w-full text-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-2">Business ID</th>
                  <th className="px-4 py-2">Start Date</th>
                  <th className="px-4 py-2">End Date</th>
                </tr>
              </thead>
              <tbody>
                {currentTrainings.map(training => (
                  <tr key={training._id}>
                    <td className="border px-4 py-2">{training.businessRequestId}</td>
                    <td className="border px-4 py-2">{new Date(training.startDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(training.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default DashboardHome;