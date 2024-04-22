import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        {error && (
          <div role="alert" className="rounded-xl border border-red-500 bg-white p-4 text-red-500">
            {error}
          </div>
        )}

        <div className="max-w-xl mx-auto">
          <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
            Login to Your Account 🚀
          </h1>

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

            {/* Submit Button */}
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>

      {success && (
        <div role="alert" className="rounded-xl border border-green-500 bg-white p-4 text-green-500">
          <strong className="block font-medium text-gray-900">Login Successful</strong>
          <p className="mt-1 text-sm text-gray-700">You have successfully logged in.</p>
        </div>
      )}
    </section>
  );
};

export default Login;
