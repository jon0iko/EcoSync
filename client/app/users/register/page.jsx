'use client'

import { useState } from 'react';
import Head from 'next/head';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('Unassigned');
    
    const handlefunction = async (e) => {
        e.preventDefault();
        if (!username || !password || !email) {
          setMessage('All fields are required.');
          return;
        }
        try {
          const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, role }),
          })
          const msg = await response.json();
          setMessage(msg.message);
          window.location.href = '/auth/login';
        }
        catch (error) {
          console.error('Error logging in:', error);
        }
      };

    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Head>
        <title>User Creation</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-md">
        <header className="text-3xl text-black font-bold text-center mb-8">EcoSync</header>
        <form onSubmit={handlefunction} className="space-y-4">
          <header className="text-xl text-black font-bold text-center mb-8"> Register </header>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-black font-medium mb-1.5 mx-1.5">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-black font-medium mb-1.5 mx-1.5">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
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
              placeholder="Enter a strong password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role" className="text-sm text-black font-medium mb-1.5 mx-1.5">
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50 text-black"
            >
              <option value="Unassigned">Unassigned</option>
              <option value="SYSTEM_ADMIN">SYSTEM_ADMIN</option>
              <option value="LANDFILL_MANAGER">LANDFILL_MANAGER</option>
              <option value="STS_MANAGER">STS_MANAGER</option>
            </select>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-green-500">{message}</p>
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            onClick={handlefunction}>
            Create
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;