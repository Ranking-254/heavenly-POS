const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/authMiddleware');

// GET DASHBOARD STATS
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const sales = await Sale.find();
    const actualRevenue = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalSales = sales.length;

    const lowStockCount = await Product.countDocuments({ stockQuantity: { $lte: 5 } });
    const totalProducts = await Product.countDocuments();

    // Security check: Only Admin sees actual revenue
    const revenueToShow = req.user.role === 'admin' ? actualRevenue : 0;

    res.status(200).json({
      totalRevenue: revenueToShow,
      totalSales,
      lowStockCount,
      totalProducts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SALES TREND (Last 7 Days)
router.get('/trend', async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }, 
      { $limit: 7 } 
    ]);
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PROCESS NEW SALE
router.post('/', verifyToken, async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    // 1. Validate Stock
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.name} not found` });
      }
      if (product.stockQuantity < item.qty) {
        return res.status(400).json({ message: `Not enough stock for ${item.name}` });
      }
    }

    // 2. Deduct Stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stockQuantity: -item.qty }
      });
    }

    // 3. Create the Sale Object (THIS WAS MISSING!)
    const newSale = new Sale({
      items: items.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      totalAmount
    });

    // 4. Save to Database
    const savedSale = await newSale.save();

    // 5. Emit Socket Event (Real-time update)
    const io = req.app.get('socketio');
    if (io) {
      io.emit('sale-update');
    }

    res.status(201).json(savedSale);

  } catch (err) {
    console.error("Sale Error:", err);
    res.status(500).json({ message: "Transaction Failed", error: err });
  }
});

module.exports = router;