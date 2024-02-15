import React, { useState } from "react";
import axios from "axios";

function BusinessRequestModal({ isOpen, onClose, request }) {
  const [email, setEmail] = useState("");
  const [calculatedBudget, setCalculatedBudget] = useState("");

  // Function to calculate price per day
  const calculatePricePerDay = () => {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const durationInMilliseconds = endDate - startDate;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    const durationOfTraining = request.durationOfTraining;
    const trainingBudget = request.trainingBudget;

    if (durationOfTraining <= 0) {
      return "Invalid duration";
    }

    const pricePerDay = trainingBudget / (durationInDays * durationOfTraining);
    return isNaN(pricePerDay) ? "Invalid price" : pricePerDay.toFixed(2);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/adminpurchase-orders",
        {
          businessRequestId: request._id,
          trainerEmail: email,
          amount: calculatedBudget, // Include the calculatedBudget entered by the user
          status: false,
          startDate: request.startDate,
          endDate: request.endDate,
        }
      );

      console.log("Purchase order created:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Submit Business Request</h2>
        {/* Display static data from business request */}
        <div className="mb-4">
          <p>
            <strong>Batch Name:</strong> {request.batchName}
          </p>
          <p>
            <strong>Technology:</strong> {request.technology}
          </p>
          <p>
            <strong>Start Date:</strong> {request.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {request.endDate}
          </p>
          <p>
            <strong>Training Budget:</strong> {request.trainingBudget}
          </p>
          <p>
            <strong>Price Per Day:</strong> {calculatePricePerDay()}
          </p>
        </div>
        {/* Input fields for Trainer Email and Calculated Budget */}
        <div className="mb-4">
          <label className="block mb-1">Trainer Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 px-2 py-1 w-full rounded"
            placeholder="Enter Trainer Email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Calculated Budget:</label>
          <input
            type="number"
            value={calculatedBudget}
            onChange={(e) => setCalculatedBudget(e.target.value)}
            className="border border-gray-400 px-2 py-1 w-full rounded"
            placeholder="Enter Calculated Budget"
          />
        </div>
        {/* Submit and Cancel buttons */}
        <div className="flex justify-end">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessRequestModal;
