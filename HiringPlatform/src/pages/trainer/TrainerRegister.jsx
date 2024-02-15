import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
 
const TrainerRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contactNumber: "",
    skills: "",
    city: "",
    chargePerDay: "",
  });
 
  const [errors, setErrors] = useState({});
 
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length === 0) {
        await axios.post("http://localhost:3001/trainers", formData);
        console.log("Trainer registered successfully");
        navigate("/sign-in"); // Adjust the route as necessary
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      console.error("Error registering trainer:", error);
    }
  };
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const validateForm = (data) => {
    const errors = {};
    if (!data.password || data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/\d/.test(data.password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[a-z]/.test(data.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(data.password)) {
      errors.password = "Password must contain at least one special character";
    }
    if (!/^\d{10}$/.test(data.contactNumber)) {
      errors.contactNumber = "Contact number must be 10 digits long";
    }
    if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };
 
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-6">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h2 className="text-2xl font-bold text-white text-center">
              Trainer Registration
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-8 py-6"
            noValidate
          >
            {Object.entries(formData).map(([key, value], index) => (
              <div key={key} className={`mb-4 ${index !== 0 && "mt-4"}`}>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  placeholder={
                    key[0].toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1").trim()
                  } // Converts camelCase to normal string
                  value={value}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 ${
                    errors[key] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[key] && (
                  <p className="text-red-500 text-sm">{errors[key]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gradient-to-br focus:outline-none focus:shadow-outline transform transition duration-150 hover:scale-105"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
 
export default TrainerRegister;