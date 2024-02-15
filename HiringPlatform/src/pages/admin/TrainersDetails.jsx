import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTrainerModal from "./EditTrainerModal"; // Import the modal component

function TrainersDetails() {
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admintrainers");
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/admintrainers/${id}`);
      setTrainers(trainers.filter((trainer) => trainer._id !== id));
      console.log("Trainer deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Trainers Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Username</th>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Contact</th>
                <th className="py-2 px-3 text-left">Skills</th>
                <th className="py-2 px-3 text-left">Charge/day</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="bg-white">
                  <td className="py-2 px-3">{trainer.username}</td>
                  <td className="py-2 px-3">{trainer.name}</td>
                  <td className="py-2 px-3">{trainer.email}</td>
                  <td className="py-2 px-3">{trainer.contactNumber}</td>
                  <td className="py-2 px-3">{trainer.skills}</td>
                  <td className="py-2 px-3">{trainer.chargePerDay}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleEdit(trainer)}
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainer._id)}
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-2 rounded mr-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Edit Trainer Modal */}
        <EditTrainerModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          trainer={selectedTrainer}
          fetchTrainers={fetchTrainers}
        />
      </div>
    </>
  );
}

export default TrainersDetails;
