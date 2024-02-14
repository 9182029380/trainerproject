import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About Trainer Engagement Platform</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to revolutionize the way trainers and companies connect and collaborate.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            We envision a future where training and development are accessible to all, fostering growth and innovation.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Company Culture</h2>
          <p className="text-gray-700 mb-4">
            At Trainer Engagement Platform, we value innovation, collaboration, and continuous improvement.
          </p>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-gray-700">Founder & CEO</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-700">CTO</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Alice Johnson</h3>
              <p className="text-gray-700">Head of Operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
