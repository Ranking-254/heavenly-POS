import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    costPrice: '',
    stockQuantity: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This sends the data to your Node Server
      await api.post('/products', formData);
      alert('Product Added Successfully!');
      navigate('/'); // Redirect to home/inventory list
    } catch (err) {
      console.error(err);
      alert('Error adding product. Check if SKU is unique.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input 
            type="text" name="name" placeholder="e.g. iPhone 15" required
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={handleChange}
          />
        </div>

        {/* SKU & Category Row */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">SKU (Barcode)</label>
            <input 
              type="text" name="sku" placeholder="XYZ-123" required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input 
              type="text" name="category" placeholder="Electronics" required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Prices Row */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Selling Price ($)</label>
            <input 
              type="number" name="price" required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Cost Price ($)</label>
            <input 
              type="number" name="costPrice" required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Stock</label>
          <input 
            type="number" name="stockQuantity" required
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={handleChange}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;