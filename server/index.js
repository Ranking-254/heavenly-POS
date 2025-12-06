const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // 1. Import HTTP
const { Server } = require("socket.io"); // 2. Import Socket.io

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 3. Create HTTP Server & Attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your React Client
    methods: ["GET", "POST"]
  }
});

// 4. Store 'io' so we can use it in routes
app.set('socketio', io);

// 5. Basic Socket Connection Log
io.on('connection', (socket) => {
  console.log('⚡ A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Route Imports
const productRoutes = require('./routes/productRoute');
const saleRoutes = require('./routes/saleRoute');
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Database Connected"))
    .catch(err => console.log(err));

// 6. CHANGE app.listen TO server.listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});