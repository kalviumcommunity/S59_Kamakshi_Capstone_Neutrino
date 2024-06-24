import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { auth, provider, signInWithRedirect, getRedirectResult } from './firebase'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          try {
            const response = await axios.get(`http://localhost:8080/api/users?email=${user.email}`);
            setNotification({ open: true, message: 'Login Successful', severity: 'success' });
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setNotification({ open: true, message: 'User not registered. Please sign up first.', severity: 'error' });
            } else {
              setNotification({ open: true, message: 'Google Sign-In Failed: ' + error.message, severity: 'error' });
            }
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
        setNotification({ open: true, message: 'Google Sign-In Failed: ' + error.message, severity: 'error' });
      }
    };

    handleRedirectResult();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.username || !formData.password) {
      setNotification({ open: true, message: 'Please fill in all fields', severity: 'error' });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/login', formData);
  
      if (response.data.success) {
        const token = response.data.token;
        console.log('JWT Token:', token); 
        
        localStorage.setItem('token', token);
        
        setNotification({ open: true, message: 'Login Successful', severity: 'success' });
      } else {
        setNotification({ open: true, message: 'Invalid username or password', severity: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ open: true, message: 'Invalid username or password', severity: 'error' });
    }
  };  

  const handleGoogleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://imgs.search.brave.com/TFZtm0B4fC0O4-KwgZ5mXKMa3qNvwl8oSGM5M3cwp4M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NjYzNzgyNDY1OTgt/NWIxMWEwZDQ4NmNj/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tkh4OGJt/VjNjM0JoY0dWeWZH/VnVmREI4ZkRCOGZI/d3c"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            
          <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to Neutrino 🗞️
          </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Login to access your account and continue your journey with us.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-6">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 ml-4"
                >
                  Sign in with Google
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Don't have an account? 
                  <Link to="/registration" className="text-gray-700 underline dark:text-gray-200 ml-1">
                    Register
                  </Link>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>

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
    </section>
  );
};

export default Login;
