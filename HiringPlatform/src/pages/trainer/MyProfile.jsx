import React, { useState, useEffect } from 'react';

const MyProfile = ({ email }) => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [emailId, setEmailId] = useState(email);
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if (emailId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/trainers/${emailId}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
 
      fetchUserData();
    }
  }, [emailId]);
 
  useEffect(() => {
    setEmailId(email);
  }, [email]);
 
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
 
  const handleSaveClick = async () => {
    try {
      // Perform validation before saving
      const validationErrors = validateForm(userData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
 
      const response = await fetch(`http://localhost:3001/trainers/${emailId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
 
      if (response.ok) {
        setIsEditing(false);
        setErrors({});
      } else {
        console.error('Error updating user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };
 
  const handleChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };
 
  const validateForm = (data) => {
    const errors = {};
    // Validate email
    if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
      errors.email = 'Invalid email address';
    }
    // Validate resume and linkedInUrl (check if they are valid URLs)
    if (data.resume && !isValidUrl(data.resume)) {
      errors.resume = 'Invalid URL format';
    }
    if (data.linkedInUrl && !isValidUrl(data.linkedInUrl)) {
      errors.linkedInUrl = 'Invalid URL format';
    }
    return errors;
  };
 
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
 
  // Define the schema fields to exclude from rendering
  const excludedFields = ['_id', 'password', '__v', 'role','education','links'];
 
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {Object.entries(userData).map(([key, value]) => {
          if (excludedFields.includes(key)) {
            return null; // Exclude the field from rendering
          }
          return (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the first letter of the key */}
              </label>
              {/* Render input fields based on the type of the value */}
              {key === 'email' || key === 'username' || key === 'resume' || key === 'linkedInUrl' ? (
                <input
                  className={`shadow appearance-none border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id={key}
                  type="text"
                  value={value}
                  readOnly={!isEditing}
                  placeholder={key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Placeholder with capitalized first letter
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : typeof value === 'boolean' ? (
                <select
                  className={`block appearance-none w-full bg-white border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id={key}
                  value={value.toString()} // Convert boolean to string for select option
                  disabled={!isEditing}
                  onChange={(e) => handleChange(key, e.target.value === 'true')}
                >
                  <option value="true">Yes </option>
                  <option value="false">No</option>
                </select>
              ) : (
                <input
                  className={`shadow appearance-none border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id={key}
                  type={typeof value === 'number' ? 'number' : 'text'} // Set the input type based on the value type
                  value={value}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
              {/* Display validation errors */}
              {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
            </div>
          );
        })}
 
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
 
        {isEditing && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            onClick={handleEditClick}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
 
export default MyProfile;