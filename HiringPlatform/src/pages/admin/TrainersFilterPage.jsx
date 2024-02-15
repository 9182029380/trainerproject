import React, { useState } from "react";
import axios from "axios";

function TrainersFilterPage() {
  const [filterSkills, setFilterSkills] = useState("");
  const [filterChargePerDay, setFilterChargePerDay] = useState("");
  const [filteredTrainers, setFilteredTrainers] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admintrainers");
      let filteredData = response.data;

      // Filter by skills
      if (filterSkills) {
        filteredData = filteredData.filter((trainer) =>
          trainer.skills.toLowerCase().includes(filterSkills.toLowerCase())
        );
      }

      // Filter by charge per day
      if (filterChargePerDay) {
        filteredData = filteredData.filter(
          (trainer) => trainer.chargePerDay <= parseFloat(filterChargePerDay)
        );
      }

      // Check if both conditions are true
      if (filterSkills && filterChargePerDay) {
        setFilteredTrainers(filteredData);
      } else {
        // Reset filtered trainers if one or both conditions are not met
        setFilteredTrainers([]);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  return (
    <div className="container mx-auto px-2 py-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Filter Trainers</h2>
      <div className="flex mb-4">
        <label htmlFor="filterSkills" className="mr-2">
          Filter by Skills:
        </label>
        <input
          type="text"
          id="filterSkills"
          value={filterSkills}
          onChange={(e) => setFilterSkills(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md mr-4"
        />
        <label htmlFor="filterChargePerDay" className="mr-2">
          Filter by Charge/Day:
        </label>
        <input
          type="text"
          id="filterChargePerDay"
          value={filterChargePerDay}
          onChange={(e) => setFilterChargePerDay(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md mr-4"
        />
        <button
          onClick={handleFilter}
          className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
        >
          Filter
        </button>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2 text-black">
          Filtered Trainers
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Contact Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTrainers.map((trainer) => (
                <tr key={trainer._id} className="bg-white">
                  <td className="py-4 px-6">{trainer.name}</td>
                  <td className="py-4 px-6">{trainer.email}</td>
                  <td className="py-4 px-6">{trainer.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TrainersFilterPage;
