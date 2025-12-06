const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sku: { 
    // This acts as the Barcode
    type: String, 
    required: true, 
    unique: true 
  },
  category: {
    type: String,
    required: true,
    index: true // Helps search faster
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  price: { 
    // Selling Price
    type: Number, 
    required: true,
    min: 0
  },
  costPrice: { 
    // For calculating profit later
    type: Number, 
    required: true,
    min: 0
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  alertQuantity: {
    // Notify when stock is low (e.g., 5 items left)
    type: Number,
    default: 5
  },
  taxRate: {
    // e.g., 16 for 16% VAT
    type: Number,
    default: 0
  },
  image: {
    // URL to image (Cloudinary or local)
    type: String,
    default: ''
  }
}, { timestamps: true });

// Optimize searching by name or SKU
ProductSchema.index({ name: 'text', sku: 'text' });

module.exports = mongoose.model('Product', ProductSchema);