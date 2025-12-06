import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      
      // 1. Save the token and user info to LocalStorage (Browser Memory)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      // 2. Go to Dashboard
      navigate('/');
      window.location.reload(); // Reload to apply auth state
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      
      {/* 1. THE ELECTRIC BORDER CONTAINER */}
      <div className="relative group w-full max-w-md">
        
        {/* The Glowing Gradient Blob (Behind the card) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-border-spin"></div>
        
        {/* 2. THE LOGIN CARD (On top) */}
        <div className="relative bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Heavenly POS</h2>
          <p className="text-gray-400 text-center mb-8">Sign in to access the system</p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm font-bold block mb-2">Username</label>
              <input 
                type="text" 
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-bold block mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          {/* Helper Text (Since we don't have a register page yet) */}
          <p className="text-gray-500 text-xs text-center mt-6">
            Ask your administrator for credentials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;