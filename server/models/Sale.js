const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: true
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      qty: Number
    }
  ],
  paymentMethod: {
    type: String,
    default: 'Cash'
  }
}, { timestamps: true });

module.exports = mongoose.model('Sale', SaleSchema);