const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// 1. ADD NEW PRODUCT
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. GET ALL PRODUCTS (For the Inventory Table)
router.get('/', verifyToken, async (req, res) => {
  try {
    // We sort by createdAt -1 to show newest items first
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. GET SINGLE PRODUCT (By Barcode/SKU) - Essential for the Scanner
router.get('/scan/:sku', async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json("Product not found");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;