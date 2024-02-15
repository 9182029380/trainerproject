import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    maxHeight: "80vh", // Set a maximum height
    overflowY: "auto", // Enable vertical scrolling if content exceeds maxHeight
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
  },
};

function EditTrainerModal({ isOpen, closeModal, trainer, fetchTrainers }) {
  const [trainerData, setTrainerData] = useState({});

  // useEffect(() => {
  //   if (trainer) {
  //     setTrainerData(trainer);
  //   }
  // }, [trainer]);

  useEffect(() => {
    if (trainer) {
      setTrainerData(trainer);
    } else if (trainerData._id) {
      // Assuming you have a way to get the trainer ID
      const fetchTrainerDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/admintrainers/${trainerData._id}`
          );
          setTrainerData(response.data);
        } catch (error) {
          console.error("Error fetching trainer details:", error);
        }
      };
      fetchTrainerDetails();
    }
  }, [trainer, trainerData._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/admintrainers/${trainerData._id}`,
        trainerData
      );
      fetchTrainers();
      closeModal();
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h1>Edit Trainer</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={trainerData.username || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={trainerData.name || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={trainerData.email || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Contact Number:
          </label>
          <input
            type="text"
            name="phone"
            value={trainerData.contactNumber || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Skills:
          </label>
          <input
            type="text"
            name="skills"
            value={trainerData.skills || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={trainerData.address || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Charges/day:
          </label>
          <input
            type="text"
            name="chargePerDay"
            value={trainerData.chargePerDay || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        {/* Add other input fields for trainer details */}
        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default EditTrainerModal;
