import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'cashier' // Default to cashier
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('New Staff Account Created Successfully!');
      navigate('/'); // Go back to dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register New Staff</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            placeholder="e.g. john_doe" 
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:border-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            placeholder="******" 
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:border-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            value={formData.role}
          >
            <option value="cashier">Cashier</option>
            <option value="admin">Admin (Manager)</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition font-bold"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;