import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/login');
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:8080/api/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setFormData({ username: response.data.username, password: '' });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setNotification({ open: true, message: 'Failed to load user data', severity: 'error' });
      }
    };

    fetchUserData();
  }, [history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put('http://localhost:8080/api/user', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotification({ open: true, message: 'Profile updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setNotification({ open: true, message: 'Failed to update profile', severity: 'error' });
    }
  };

  return (
    <div className="profile-section">
      <img src="path/to/your/profile.png" alt="Profile" className="profile-image" />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
