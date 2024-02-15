import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BusinessRequestModal from "./BusinessRequestModal";
import TrainersFilterPage from "./TrainersFilterPage";

function calculatePricePerDay(request) {
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
}

function BusinessRequestsDetails() {
  const [businessRequests, setBusinessRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessRequests();
  }, []);

  const fetchBusinessRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/adminbusinessrequests"
      );
      console.log(response.data);
      setBusinessRequests(response.data);
    } catch (error) {
      console.error("Error fetching business requests:", error);
    }
  };

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReject = async (businessId) => {
    try {
      // Send a DELETE request to the backend to delete the record
      await axios.delete(
        `http://localhost:3001/adminbusinessrequests/${businessId}`
      );

      // If the deletion is successful, update the state to remove the deleted record
      setBusinessRequests((prevBusinessRequests) =>
        prevBusinessRequests.filter((request) => request._id !== businessId)
      );

      console.log("Business request rejected successfully");
    } catch (error) {
      console.error("Error rejecting business request:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businessRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <TrainersFilterPage />
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Business Requests Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Batch Name</th>
                <th className="py-2 px-3 text-left">Technology</th>
                <th className="py-2 px-3 text-left">Start Date</th>
                <th className="py-2 px-3 text-left">End Date</th>
                <th className="py-2 px-3 text-left">Training Budget</th>
                <th className="py-2 px-3 text-left">Price Per Day</th>
                <th className="py-2 px-3 text-left">Company Name</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((request) => (
                <tr key={request._id} className="bg-white">
                  <td className="py-2 px-3">{request.batchName}</td>
                  <td className="py-2 px-3">{request.technology}</td>
                  <td className="py-2 px-3">{request.startDate}</td>
                  <td className="py-2 px-3">{request.endDate}</td>
                  <td className="py-2 px-3">{request.trainingBudget}</td>
                  <td className="py-2 px-3">{calculatePricePerDay(request)}</td>
                  <td className="py-2 px-3">
                    {typeof request.uniqueId === "object"
                      ? request.uniqueId.companyName
                      : request.uniqueId}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded mr-1"
                      onClick={() => handleOpenModal(request)}
                    >
                      Submit
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= businessRequests.length}
          >
            Next
          </button>
        </div>

        {/* Render the modal */}
        {isModalOpen && (
          <BusinessRequestModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            request={selectedRequest}
          />
        )}
      </div>
    </>
  );
}

export default BusinessRequestsDetails;
