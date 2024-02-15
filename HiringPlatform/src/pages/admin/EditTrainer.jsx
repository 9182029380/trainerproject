import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditTrainer() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTrainerDetails();
  }, [id]);

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/admintrainers/${id}`);
      setTrainer(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/admintrainers/${id}`, formData);
      // Redirect or show a success message
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-purple-700">Edit Trainer</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        {/* Add other input fields for trainer details */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTrainer;
