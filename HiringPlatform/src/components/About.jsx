import React from 'react';
import Navbar from './Navbar';
 
const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">About Trainer Engagement Platform</h1>
        <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to transform how trainers and companies collaborate. We provide a platform for transparent communication, resource management, and impactful learning experiences. We empower trainers to showcase their expertise, help companies find and engage with them easily, and drive continuous learning and development.
            </p>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision</h2>
            <p className="text-gray-700 mb-4">
              We envision a future where training and development are accessible to all, fostering growth and innovation. Our goal is to break down barriers to learning by providing a platform that connects trainers and companies worldwide. We believe that by making training more accessible, we can empower individuals and organizations to reach their full potential, driving innovation and growth in every industry.
            </p>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Company Culture</h2>
            <p className="text-gray-700 mb-4">
            At Trainer Engagement Platform, our culture is built on innovation, collaboration, and continuous improvement. We foster a dynamic environment where creativity thrives and ideas are shared freely. Every team member is encouraged to contribute their unique perspective, and we believe in learning from both successes and failures. Our commitment to excellence drives us to deliver the best experience for trainers and companies.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden mb-8 p-4">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">BugHunters</h3>
                <p className="text-gray-700">Abshar Fatima</p>
                <p className="text-gray-700">Mayuri Game</p>
                <p className="text-gray-700">Revati Nikumbh</p>
                <p className="text-gray-700">Sohel Sheikh</p>
              </div>
              <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden mb-8 p-4">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">BugBusters</h3>
                <p className="text-gray-700">Pracheeta Kalra</p>
                <p className="text-gray-700">Avinash Singh</p>
                <p className="text-gray-700">Gaurav Shimpi</p>
                <p className="text-gray-700">Prashant Sonawane</p>
              </div>
              <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden mb-8 p-4">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">Nucleus</h3>
                <p className="text-gray-700">Mugdha Jiwane</p>
                <p className="text-gray-700">Prashant Lakare</p>
                <p className="text-gray-700">Shreekanth Hajare</p>
                <p className="text-gray-700">Vinayak Ranjan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default App;
 