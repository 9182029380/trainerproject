import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = false; // Replace with your logic to check if the user is logged in or not.

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Trainer Platform
            </Link>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              {/* Additional links */}
              <li>
                <Link to="/about" className="text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-white">
                  Contact Us
                </Link>
              </li>
              {/* Conditional rendering based on login status */}
              {isLoggedIn ? (
                <li>
                  <Link to="/profile" className="text-white">
                    Profile
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/business-register" className="text-white">
                      Register as Business
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign-in" className="text-white">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/trainer-register" className="text-white">
                      Register as Trainer
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
