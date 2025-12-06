import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';

const SalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await api.get('/sales/trend');
        // Format data for Recharts (Recharts likes "name" and "value" keys)
        const formattedData = res.data.map(item => ({
          date: item._id, // The date string from MongoDB
          amount: item.totalSales
        }));
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching trend:", err);
      }
    };
    fetchTrend();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Sales Trend (Last 7 Days)</h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#2563eb" // Blue color
              strokeWidth={3}
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;