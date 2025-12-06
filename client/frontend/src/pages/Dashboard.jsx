import React, { useEffect, useState } from 'react';
import api from '../api';
import { FaMoneyBillWave, FaShoppingCart, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import SalesChart from '../components/SalesChart';
import io from 'socket.io-client';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    lowStockCount: 0,
    totalProducts: 0
  });

  // Helper function to fetch data
  const fetchStats = async () => {
    try {
      const res = await api.get('/sales/stats');
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };
useEffect(() => {
    fetchStats();

    // CONNECT TO PRODUCTION URL OR LOCALHOST
    // We strip the '/api' from the base URL to get the root server URL
    const baseUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') 
      : "http://localhost:5000";
      
    const socket = io(baseUrl);

    socket.on("sale-update", () => {
      console.log("⚡ Real-time update received!");
      fetchStats();
    });

    return () => socket.disconnect();
  }, []);

  // Reusable Card Component
  const StatCard = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-lg shadow-md text-white ${color} flex items-center justify-between`}>
      <div>
        <h3 className="text-lg font-semibold opacity-90">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className="text-4xl opacity-50">
        {icon}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Store Overview</h1>
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toFixed(2)}`} 
          icon={<FaMoneyBillWave />} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Total Sales" 
          value={stats.totalSales} 
          icon={<FaShoppingCart />} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={<FaBoxOpen />} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Low Stock Alert" 
          value={stats.lowStockCount} 
          icon={<FaExclamationTriangle />} 
          color="bg-red-500" 
        />
      </div>

      {/* 2. SALES CHART */}
      <div className="mb-10">
        <SalesChart />
      </div>

      {/* 3. Quick Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/pos" className="px-6 py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition">
            Go to POS
          </a>
          <a href="/add" className="px-6 py-3 bg-gray-600 text-white rounded font-bold hover:bg-gray-700 transition">
            Add Inventory
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;