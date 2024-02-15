import React from 'react'
 
const DashboardHome = () => {
  return (
    <>
        {/* Main Content */}
       <div className="flex-1 bg-gray-100">
         <div className="p-4">
         
           {/* Grid Layout */}
           <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 shadow-md">
               <h2 className="text-lg font-semibold mb-2">No of PO Requests</h2>
               <p className="text-gray-700">10</p>
             </div>
             <div className="bg-white p-4 shadow-md">
               <h2 className="text-lg font-semibold mb-2">Current Trainings</h2>
               <p className="text-gray-700">5</p>
             </div>
           </div>``
         </div>
       </div>
 
    </>
  )
}
 
export default DashboardHome;