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

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setSuccess(false);
      return;
    }

    try {
      const response = await axios.post('https://s59-kamakshi-capstone-neutrino-1.onrender.com/login', formData);
      if (response.data.success) {
        setSuccess(true);
        setError('');
      } else {
        setError('Invalid username or password');
        setSuccess(false);
      }
    } catch (error) {
      setError('Invalid username or password');
      setSuccess(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      {error && (
        <div role="alert" className="fixed top-4 right-4 z-50 rounded-xl border border-red-500 bg-white p-4 text-red-500 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <div className="flex-1">
              <strong className="block font-medium text-gray-900">Login Error</strong>
              <p className="mt-1 text-sm text-gray-700">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-gray-500 transition hover:text-gray-600">
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {success && (
        <div role="alert" className="fixed top-4 right-4 z-50 rounded-xl border border-green-500 bg-white p-4 text-green-500 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div className="flex-1">
              <strong className="block font-medium text-gray-900">Login Successful</strong>
              <p className="mt-1 text-sm text-gray-700">You have successfully logged in.</p>
            </div>
            <button onClick={() => setSuccess(false)} className="text-gray-500 transition hover:text-gray-600">
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7075 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.875 7.65 17.875C9.0377 17.875 10.392 17.4489 11.53 16.6547C12.146 16.175 12.9095 15.924 13.69 15.9447C14.4705 15.924 15.234 16.175 15.85 16.6547C16.988 17.4489 18.3423 17.875 19.73 17.875C21.1177 17.875 22.472 17.4489 23.61 16.6547H23.62Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome Back
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

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account? 
                    <a href="/register" className="text-gray-700 underline">
                      Register
                    </a>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </form>
    </section>
  );
};

export default Login;
