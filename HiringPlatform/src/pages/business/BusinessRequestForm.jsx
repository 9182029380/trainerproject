// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import Profile from './Profile';

// // const BusinessRequestForm = ({ companyUniqueId }) => {
// //   const [businessRequest, setBusinessRequest] = useState({
// //     batchName: '',
// //     technology: '',
// //     numberOfTrainees: 0,
// //     durationOfTraining: '',
// //     startDate: '',
// //     endDate: '',
// //     trainingBudget: '',
// //   });
// //   const [confirmation, setConfirmation] = useState(null);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setBusinessRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
// //   };

// //   const handleContinueClick = async () => {
// //     try {
// //       // // Validate BatchName (only characters)
// //       // if (!/^[a-zA-Z\s]+$/.test(businessRequest.batchName)) {
// //       //   throw new Error('BatchName should only contain characters.');
// //       // }

// //       // Validate Start Date and End Date
// //       const startDate = new Date(businessRequest.startDate);
// //       const endDate = new Date(businessRequest.endDate);

// //       if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
// //         throw new Error('Invalid start or end date format.');
// //       }

// //       if (endDate <= startDate) {
// //         throw new Error('End date should be greater than start date.');
// //       }

// //       // Calculate Duration of Training
// //       const durationOfTraining = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

// //       // Update the businessRequest state with calculated duration
// //       setBusinessRequest((prevRequest) => ({ ...prevRequest, durationOfTraining }));

// //       // Make a POST request to your backend API with Axios
// //       await axios.post('http://localhost:3001/businessrequest', {
// //         ...businessRequest,
// //         uniqueId: companyUniqueId, // Pass companyUniqueId with the request
// //       });

// //       // Optionally, clear the form or take other actions upon successful submission
// //       setConfirmation('Data submitted successfully.');

// //       setBusinessRequest({
// //         batchName: '',
// //         technology: '',
// //         numberOfTrainees: 0,
// //         durationOfTraining: '',
// //         startDate: '',
// //         endDate: '',
// //         trainingBudget: '',
// //       });
// //     } catch (error) {
// //       // Handle validation or submission errors
// //       console.error('Error submitting business request data:', error.message);
// //       setConfirmation(`Error: ${error.message}`);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
// //       <h2 className="text-2xl font-semibold mb-4">Request Form For Trainers</h2>
// //       <form className="space-y-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">Batch Name:</label>
// //           <input
// //             type="text"
// //             name="batchName"
// //             value={businessRequest.batchName}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">Technology:</label>
// //           <input
// //             type="text"
// //             name="technology"
// //             value={businessRequest.technology}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">Number of Trainees:</label>
// //           <input
// //             type="number"
// //             name="numberOfTrainees"
// //             value={businessRequest.numberOfTrainees}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">Duration of Training:</label>
// //           <input
// //             type="text"
// //             name="durationOfTraining"
// //             value={businessRequest.durationOfTraining}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">Start Date:</label>
// //           <input
// //             type="date"
// //             name="startDate"
// //             value={businessRequest.startDate}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">End Date:</label>
// //           <input
// //             type="date"
// //             name="endDate"
// //             value={businessRequest.endDate}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium text-gray-600 mb-1">Budget of Training:</label>
// //           <input
// //             type="number"
// //             name="trainingBudget"
// //             value={businessRequest.trainingBudget}
// //             onChange={handleInputChange}
// //             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
// //           />
// //         </div>

// //         <div>
// //           <button
// //             type="button"
// //             onClick={handleContinueClick}
// //             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       </form>

// //       {confirmation && (
// //         <div className={`mt-4 ${confirmation.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
// //           {confirmation}
// //         </div>
// //       )}
// //       <Profile/>
// //     </div>
// //   );
// // };

// // export default BusinessRequestForm;





// /// BussinessRequest
 
// import React, { useState } from 'react';
// import axios from 'axios';
 
// const BusinessRequestForm = ({ companyUniqueId }) => {
//   const [businessRequest, setBusinessRequest] = useState({
//     batchName: '',
//     technology: '',
//     numberOfTrainees: 0,
//     durationOfTraining: '',
//     startDate: '',
//     endDate: '',
//     trainingBudget: ''
//   });
//   const [confirmation, setConfirmation] = useState(null);
 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusinessRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
//   };
 
//   const handleContinueClick = async () => {
//     try {
 
//       // Validate Start Date and End Date
//       const startDate = new Date(businessRequest.startDate);
//       const endDate = new Date(businessRequest.endDate);
 
//       if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//         throw new Error('Invalid start or end date format.');
//       }
 
//       if (endDate <= startDate) {
//         throw new Error('End date should be greater than start date.');
//       }
 
//       // Calculate Duration of Training
//       const durationOfTraining = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
 
//       // Update the businessRequest state with calculated duration
//       setBusinessRequest((prevRequest) => ({ ...prevRequest, durationOfTraining }));
 
//     // Definining Token
//     const authToken = localStorage.getItem('token');
     
//     //Make a POST request to your backend API with Axios
//     await axios.post('http://localhost:3001/businessrequest', {
//       ...businessRequest,
//       uniqueId: companyUniqueId,
//     }, {
//       headers: {
//         'Authorization': `Bearer ${authToken}`,
//       }
//     });
 
 
//       // Optionally, clear the form or take other actions upon successful submission
//       setConfirmation('Data submitted successfully.');
//       setBusinessRequest({
//         batchName: '',
//         technology: '',
//         numberOfTrainees: 0,
//         durationOfTraining: '',
//         startDate: '',
//         endDate: '',
//         trainingBudget: 0,
//       });
//     } catch (error) {
//       // Handle validation or submission errors
//       console.error('Error submitting business request data:', error.message);
//       setConfirmation(`Error: ${error.message}`);
//     }
//   };
 
//   return (
//     <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Request Form For Trainers</h2>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Batch Name:</label>
//           <input
//             type="text"
//             name="batchName"
//             value={businessRequest.batchName}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Technology:</label>
//           <input
//             type="text"
//             name="technology"
//             value={businessRequest.technology}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Number of Trainees:</label>
//           <input
//             type="number"
//             name="numberOfTrainees"
//             value={businessRequest.numberOfTrainees}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Duration of Training:</label>
//           <input
//             type="text"
//             name="durationOfTraining"
//             value={businessRequest.durationOfTraining}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Start Date:</label>
//           <input
//             type="date"
//             name="startDate"
//             value={businessRequest.startDate}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">End Date:</label>
//           <input
//             type="date"
//             name="endDate"
//             value={businessRequest.endDate}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Budget of Training:</label>
//           <input
//             type="number"
//             name="trainingBudget"
//             value={businessRequest.trainingBudget}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>
 
//         <div>
//           <button
//             type="button"
//             onClick={handleContinueClick}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
 
//       {confirmation && (
//         <div className={`mt-4 ${confirmation.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
//           {confirmation}
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default BusinessRequestForm;



//BUSSINESSREQUEST FORM LOGIC
 
import React, { useState } from 'react';
import axios from 'axios';
 
const BusinessRequestForm = ({ companyUniqueId }) => {
  const [businessRequest, setBusinessRequest] = useState({
    batchName: '',
    technology: '',
    numberOfTrainees: 0,
    durationOfTraining: '',
    startDate: '',
    endDate: '',
    trainingBudget: ''
  });
  const [confirmation, setConfirmation] = useState(null);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
  };
 
  const handleContinueClick = async () => {
    try {
 
      // Validate Start Date and End Date
      const startDate = new Date(businessRequest.startDate);
      const endDate = new Date(businessRequest.endDate);
     
 
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid start or end date format.');
      }
 
      if (endDate <= startDate) {
        throw new Error('End date should be greater than start date.');
      }
 
      // Calculate Duration of Training
      const durationOfTraining = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
 
      // Update the businessRequest state with calculated duration
      setBusinessRequest((prevRequest) => ({ ...prevRequest, durationOfTraining: Number(durationOfTraining) }));
 
    // Definining Token
    const authToken = localStorage.getItem('token');
     
    //Make a POST request to your backend API with Axios
    await axios.post('http://localhost:3001/businessrequest', {
      ...businessRequest,
      uniqueId: authToken.id,
      durationOfTraining,
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    });
 
 
      // Optionally, clear the form or take other actions upon successful submission
      setConfirmation('Data submitted successfully.');
      setBusinessRequest({
        batchName: '',
        technology: '',
        numberOfTrainees: 0,
        durationOfTraining: 0,
        startDate: '',
        endDate: '',
        trainingBudget: 0,
      });
    } catch (error) {
      // Handle validation or submission errors
      console.error('Error submitting business request data:', error.message);
      setConfirmation(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Request Form For Trainers</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Batch Name:</label>
          <input
            type="text"
            name="batchName"
            value={businessRequest.batchName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Technology:</label>
          <input
            type="text"
            name="technology"
            value={businessRequest.technology}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Number of Trainees:</label>
          <input
            type="number"
            name="numberOfTrainees"
            value={businessRequest.numberOfTrainees}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
      <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Duration of Training:</label>
      <input
        type="number"  
        name="durationOfTraining"
        value={businessRequest.durationOfTraining}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      </div>
 
 
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={businessRequest.startDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={businessRequest.endDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Budget of Training:</label>
          <input
            type="number"
            name="trainingBudget"
            value={businessRequest.trainingBudget}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <button
            type="button"
            onClick={handleContinueClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
 
      {confirmation && (
        <div className={`mt-4 ${confirmation.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {confirmation}
        </div>
      )}
    </div>
  );
};
 
export default BusinessRequestForm;
