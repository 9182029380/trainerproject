import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusinessRegister = () => {
  const [formData, setFormData] = useState({
    uniqueId: "",
    companyName: "",
    location: "",
    phone: "",
    email: "",
    password: "",
    domain: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:3001/companies", formData);
      alert("Registration successful!");
      navigate('/sign-in');
    } catch (error) {
      console.error("Error registering company:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate uniqueId (6-digit number)
    if (!/^\d{6}$/.test(formData.uniqueId)) {
      newErrors.uniqueId = "Unique ID must be a 6-digit number.";
      isValid = false;
    }

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
      isValid = false;
    }

    // Validate other fields (required)
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "email" && !value) {
        newErrors[key] = "This field is required.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <h2 className="text-2xl font-bold text-white text-center">
            Company Registration
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                value={value}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
              {errors[key] && <p className="mt-2 text-sm text-red-600">{errors[key]}</p>}
            </div>
          ))}
          {errors.general && (
            <div className="text-center text-red-600">{errors.general}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gradient-to-br focus:outline-none focus:shadow-outline transform transition duration-150 hover:scale-105"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessRegister;
