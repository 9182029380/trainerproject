import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-12 text-center">
        <h1 className="text-4xl font-extrabold">Trainer Engagement Platform</h1>
        <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
          "Embark on a Transformative Learning Journey: Explore a Diverse Range of Skills with Expert Trainers, Tailored to Your Unique Path – Your Gateway to Personal Growth and Success on Platform."
        </p>
      </div>

      <div className="container mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        <div className="trainer bg-gradient-to-bl from-blue-100 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Trainers</h2>
          <Link to="/sign-in" className="block bg-blue-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-blue-600 transition duration-300 ease-in-out text-center">
            Login
          </Link>
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/trainer-register" className="text-blue-500 hover:underline">
            Register Now
          </Link>
        </div>

        <div className="company bg-gradient-to-bl from-green-100 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Companies</h2>
          <Link to="/sign-in" className="block bg-green-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-green-600 transition duration-300 ease-in-out text-center">
            Login
          </Link>
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/business-register" className="text-green-500 hover:underline">
            Register Now
          </Link>
        </div>
      </div>

      <div className="subfooter bg-gray-200 p-8 text-center">
        <p className="text-gray-800 text-lg">"Finding skilled trainers has never been this easy! Our Platform made it super easy."</p>
        <p className="text-gray-800 text-lg">"We connect required companies with fantastic trainers within days!"</p>
      </div>

      <div className="contact bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
        <p className="text-lg">Contact Us: 9527218479</p>
        <p className="text-lg">Email: support@sharathinfotech.com</p>
        <p className="text-lg">Phone: 20087654</p>
      </div>
    </>
  );
}

export default Home;
