import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
 
const BusinessRegister = () => {
  // Define the generateUniqueId function before using it
  const generateUniqueId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
 
  const [formData, setFormData] = useState({
    uniqueId: generateUniqueId(),
    companyName: "",
    location: "",
    phone: "",
    email: "",
    password: "",
    domain: "",
  });
 
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    checkEmailExistence();
  }, [formData.email]);
 
  const handleChange = (e) => {
    let value = e.target.value;
 
    // Apply specific formatting for company name, location, and domain
    if (["companyName", "location", "domain"].includes(e.target.name)) {
      value = formatInput(value);
    }
 
    setFormData({ ...formData, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
    setEmailExists(false); // Reset email existence status on input change
  };
 
  const formatInput = (input) => {
    // Format string to have the first letter in uppercase and the rest in lowercase
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  };
 
  const checkEmailExistence = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/check-email?email=${formData.email}`
      );
 
      if (response.data.exists) {
        // If the email already exists, set the specific error message
        setErrors({ ...errors, email: 'Email already exists. Please choose a different one.' });
      } else {
        // If the email doesn't exist, clear the email error
        setErrors({ ...errors, email: '' });
      }
 
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) {
      return;
    }
 
    try {
      // Check email existence before submitting
      await checkEmailExistence();
 
      if (emailExists) {
        // Handle email existence error (show a message to the user)
        setErrors({ ...errors, email: 'Email already exists. Please choose a different one.' });
        return;
      }
 
      // If email doesn't exist, proceed with registration
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
 
 
  // Validate email format
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
  newErrors.email = "Please enter a valid email address.";
  isValid = false;
} else if (emailExists) {
  newErrors.email = "Email already exists. Please choose a different one.";
  isValid = false;
}
 
 
    // Validate phone (10-digit number)
    if (!/^\d{10}$/.test(formData.phone)) {
         newErrors.phone = "Phone number must be a 10-digit number.";
         isValid = false;
        }
 
    // Validate password (at least 8 characters, one uppercase, one lowercase, one digit, one symbol)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{}|;:'",.<>?/\\]).{8,}$/.test(formData.password)) {
    newErrors.password =
    "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one symbol.";
    isValid = false;
      }    
       
       // Validate other fields (required)
       for (const [key, value] of Object.entries(formData)) {
        if (key !== "email" && key !== "phone" && !value) {
          newErrors[key] = "This field is required.";
          isValid = false;
        }
      }
 
    setErrors(newErrors);
    return isValid;
  };
 
  return (
    <>
    <Navbar/>
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
    </>
  );
};
 
export default BusinessRegister;