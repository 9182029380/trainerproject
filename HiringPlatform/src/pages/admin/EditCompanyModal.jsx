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
    backgroundColor: "#fff", // Set background color
  },
};

// function EditCompanyModal({ isOpen, closeModal, companyId, fetchCompanies }) {
//   const [companyData, setCompanyData] = useState({
//     companyName: "",
//     location: "",
//     email: "",
//     phone: "",
//     domain: "",
//   });

//   useEffect(() => {
//     if (companyId) {
//       const fetchCompanyDetails = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/companies/${companyId}`
//           );
//           setCompanyData(response.data);
//         } catch (error) {
//           console.error("Error fetching company details:", error);
//         }
//       };
//       fetchCompanyDetails();
//     }
//   }, [companyId]);

//   //   if (isOpen && companyId) {
//   //     fetchCompanies();
//   //   }
//   // }, [isOpen, companyId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:3001/companies/${companyId}`,
//         companyData
//       );
//       fetchCompanies();
//       closeModal();
//     } catch (error) {
//       console.error("Error updating company:", error);
//     }
//   };

function EditCompanyModal({ isOpen, closeModal, companyId, fetchCompanies }) {
  const [companyData, setCompanyData] = useState({
    // companyName: "",
    // location: "",
    // email: "",
    // phone: "",
    // domain: "",
  });

  useEffect(() => {
    if (companyId) {
      setCompanyData(companyId);
    } else if (companyData._id) {
      const fetchCompanyDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/admincompanies/${companyData._id}`
          );
          setCompanyData(response.data);
        } catch (error) {
          console.error("Error fetching company details:", error);
        }
      };
      fetchCompanyDetails();
    }
  }, [companyId, companyData._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/admincompanies/${companyId}`,
        companyData
      );
      fetchCompanies();
      closeModal();
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2 className="text-xl font-bold mb-4">Edit Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name:
          </label>
          <input
            type="text"
            name="companyName"
            value={companyData.companyName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={companyData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            value={companyData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Domain:
          </label>
          <input
            type="text"
            name="domain"
            value={companyData.domain}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded"
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default EditCompanyModal;
