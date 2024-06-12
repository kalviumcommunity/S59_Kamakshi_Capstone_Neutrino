import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  const [editMode, setEditMode] = useState({
    username: false,
    email: false
  });

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditToggle = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSave = async (field) => {
    try {
      await axios.put(`http://localhost:8080/api/profile/${field}`, {
        [field]: userData[field]
      });
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [field]: false
      }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-field">
        {editMode.username ? (
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <span>{userData.username}</span>
        )}
        <button onClick={() => handleEditToggle('username')}>
          {editMode.username ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="profile-field">
        {editMode.email ? (
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <span>{userData.email}</span>
        )}
        <button onClick={() => handleEditToggle('email')}>
          {editMode.email ? 'Save' : 'Edit'}
        </button>
      </div>
    </section>
  );
};

export default Profile;
