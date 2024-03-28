'use client'

import { useState } from 'react';
import Head from 'next/head';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter a username and password.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (response.status == 200) {
        //redirect to a new page
        window.location.href = '/dashboard';
      }
      else {
      const msg = await response.json();
      setMessage(msg.message);
      }
    }
    catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Head>
        <title>EcoSync Login</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-md">
        <header className="text-3xl text-black font-bold text-center mb-8">EcoSync</header>
        <form onSubmit={handleLogin} className="space-y-4">
          <header className="text-xl text-black font-bold text-center mb-8"> Login </header>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-black font-medium mb-1.5 mx-1.5">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your Email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-black font-medium mb-1.5 mx-1.5">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-red-500">{message}</p>
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            onClick={handleLogin}>
            Login
          </button>
          </div>
          <div className="flex justify-center">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
