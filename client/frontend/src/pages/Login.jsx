import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  // 1. ADD LOADING STATE
  const [isLoading, setIsLoading] = useState(false); 
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 2. START LOADING & CLEAR ERRORS
    setIsLoading(true); 
    setError(null);     

    try {
      const res = await api.post('/auth/login', { username, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      navigate('/');
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      // Show a helpful message if it fails
      setError(err.response?.data || "Login failed. Server might be waking up...");
      
      // 3. STOP LOADING ON ERROR
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      
      {/* CONTAINER: Cuts off the messy corners of the spinner */}
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl overflow-hidden ">
        
        {/* THE ANIMATION: Multi-color spinning snake */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_20%,#22d3ee_50%,#3b82f6_75%,#9333ea_100%)]"></div>

        {/* THE CARD CONTENT */}
        <div className="relative inset-[2px] bg-gray-800 rounded-xl p-8 h-full border border-gray-700/50 z-10">
          
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
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-bold block mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-cyan-400 transition"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 4. UPDATED BUTTON: Shows "Connecting..." state */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full font-bold py-3 rounded-lg transition-all transform ${
                isLoading 
                  ? "bg-gray-600 cursor-not-allowed text-gray-300" 
                  : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:scale-[1.02] text-white"
              }`}
            >
              {isLoading ? "Connecting..." : "Sign In"}
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-6">
             Ask your administrator for credentials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;