import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState({
    company_id: "",
    trainer_name: "",
    trainer_id: "",
    stars: "",
    feedback_description: "",
  });

  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        // Clear the form fields
        setFeedbackData({
          company_id:"",
          trainer_name: "",
          trainer_id: "",
          stars: "",
          feedback_description: "",
        });
        alert("Feedback submitted successfully!");
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
       <div className="mb-4">
        <label htmlFor="company_id" className="block text-sm font-medium text-gray-600">Company Email:</label>
        <input
          type="email"
          id="company_id"
          name="company_id"
          value={feedbackData.company_id}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="trainer_name" className="block text-sm font-medium text-gray-600">Trainer Name:</label>
        <input
          type="text"
          id="trainer_name"
          name="trainer_name"
          value={feedbackData.trainer_name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="trainer_id" className="block text-sm font-medium text-gray-600">Trainer ID:</label>
        <input
          type="text"
          id="trainer_id"
          name="trainer_id"
          value={feedbackData.trainer_id}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stars" className="block text-sm font-medium text-gray-600">Rating out of 10:</label>
        <input
          type="number"
          id="stars"
          name="stars"
          min="0"
          max="10"
          value={feedbackData.stars}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="feedback_description" className="block text-sm font-medium text-gray-600">Feedback Description:</label>
        <textarea
          id="feedback_description"
          name="feedback_description"
          value={feedbackData.feedback_description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;

