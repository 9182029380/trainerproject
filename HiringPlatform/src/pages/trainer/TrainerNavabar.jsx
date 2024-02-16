import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TrainerNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  
  const handleLogout = () => {
    // Delete token from localStorage
    localStorage.removeItem("token");
    // Redirect to home page
    navigate("/");
  };


  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <p className="text-white text-xl font-bold">
              Trainer Platform
            </p>

            <Link to="/about-us" className="text-white">
              About
            </Link>

            <Link to="/contact-us" className="text-white">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6" onMouseDown={() => setIsDropdownOpen(!isDropdownOpen)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white rounded-lg shadow-md mt-2" onMouseDown={(e) => e.stopPropagation()}>
                <ul className="py-2">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TrainerNavbar;
