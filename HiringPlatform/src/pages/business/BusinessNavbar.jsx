import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const BusinessNavbar = () => {
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
            <img
              src="/path/to/default/profile-pic.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onMouseDown={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white rounded-lg shadow-md mt-2" onMouseDown={(e) => e.stopPropagation()}>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/update-profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Update Profile
                    </Link>
                  </li>
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
 
export default BusinessNavbar;