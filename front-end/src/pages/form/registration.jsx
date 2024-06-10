import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { auth, provider, signInWithRedirect, getRedirectResult } from './firebase';

const Registration = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: '',
    password_confirmation: '',
    marketing_accept: false
  });

  const [errors, setErrors] = useState([]);
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
          const response = await axios.get(`http://localhost:8080/api/users?email=${user.email}`);
          if (response.status === 200) {
            setNotification({ open: true, message: 'User already registered with Google.', severity: 'success' });
          } else {
            setNotification({ open: true, message: 'Please complete the registration form.', severity: 'info' });
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
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setNotification({ open: true, message: validationErrors.join(', '), severity: 'error' });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/users', formData);
      console.log(response.data);
      setNotification({ open: true, message: 'Signup Successful!', severity: 'success' });
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response && error.response.status === 404) {
        setNotification({ open: true, message: 'Username or email already exists.', severity: 'error' });
      } else {
        setNotification({ open: true, message: 'Signup Failed: ' + error.message, severity: 'error' });
      }
    }
  };  

  const validateForm = (data) => {
    const errors = [];
    if (!data.email || !data.password || !data.username || !data.password_confirmation) {
      errors.push("All fields are required.");
    }
    if (data.password !== data.password_confirmation) {
      errors.push("Passwords do not match.");
    }
    if (data.username.length < 4) {
      errors.push("Username must be at least 4 characters long.");
    }
    return errors;
  };

  const handleGoogleSignIn = () => {
    signInWithRedirect(auth, provider);
  };


  return (
    <section className="bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit}>

        {/* Original form content */}
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

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                quibusdam aperiam voluptatum.
              </p>

              <div className="mt-8 grid grid-cols-6 gap-6">
                {/* Username */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Username
                  </label>
                  <input
                    type="text"
                    id="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                  />
                </div>

                {/* Email */}
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                  />
                </div>

                {/* Password */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                  />
                </div>

                {/* Password Confirmation */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 py-2 px-2"
                  />
                </div>

                {/* Marketing Accept Checkbox */}
                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      checked={formData.marketing_accept}
                      onChange={handleChange}
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      I want to receive emails about events, product updates and company announcements.
                    </span>
                  </label>
                </div>

                {/* Terms and Conditions */}
                <div className="col-span-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-gray-700 underline dark:text-gray-200">
                      terms and conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-gray-700 underline dark:text-gray-200">
                      privacy policy.
                    </a>
                  </p>
                </div>

                {/* Submit Button */}
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  >
                    Create an account
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gray-700 underline dark:text-gray-200">
                      Log in
                    </Link>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 dark:hover:bg-red-700 dark:hover:text-white"
                >
                  Sign up with Google
                </button>
              </div>
            </div>
          </main>
        </div>
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
    </section>
  );
};

export default Registration;
