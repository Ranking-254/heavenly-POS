# Heavenly POS System

A comprehensive Point of Sale (POS) system built with a modern full-stack architecture, featuring real-time updates, inventory management, sales tracking, and an intuitive user interface.

## Features

- **User Authentication**: Secure registration and login with JWT tokens and role-based access (Admin/User)
- **Product Management**: Add, view, and manage inventory with SKU-based scanning
- **Sales Processing**: Real-time sales transactions with stock validation and automatic inventory updates
- **Dashboard Analytics**: Comprehensive dashboard with sales statistics, revenue tracking, and low stock alerts
- **Real-time Updates**: Live notifications and updates using Socket.io
- **Receipt Generation**: Printable receipts for completed transactions
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Charts and Visualizations**: Sales trend charts using Recharts

## Tech Stack

### Backend

- **Node.js** with **Express.js** for server-side logic
- **MongoDB** with **Mongoose** for data persistence
- **JWT** for authentication and authorization
- **Socket.io** for real-time communication
- **bcryptjs** for password hashing

### Frontend

- **React 19** with **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React-to-Print** for receipt generation
- **Socket.io-client** for real-time updates

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd heavenly-pos-system
   ```

2. **Backend Setup:**

   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup:**

   ```bash
   cd ../client/frontend
   npm install
   ```

4. **Environment Configuration:**
   Create a `.env` file in the `server` directory with the following variables:

   ```
   MONGO_URL=mongodb://localhost:27017/heavenly-pos
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

   Replace `your-secret-key-here` with a secure random string.

## Usage

1. **Start MongoDB:**
   Ensure MongoDB is running on your system.

2. **Start the Backend Server:**

   ```bash
   cd server
   npm run dev
   ```

   The server will start on `http://localhost:5000`

3. **Start the Frontend:**

   ```bash
   cd client/frontend
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:5173`
   - Register a new admin account or login with existing credentials
   - Start managing your POS system!

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Product Endpoints

- `POST /api/products` - Add new product (Admin only)
- `GET /api/products` - Get all products
- `GET /api/products/scan/:sku` - Get product by SKU

### Sales Endpoints

- `POST /api/sales` - Process new sale
- `GET /api/sales/stats` - Get dashboard statistics
- `GET /api/sales/trend` - Get sales trend data (last 7 days)

## Project Structure

```
heavenly-pos-system/
├── client/
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── api.js
│       ├── package.json
│       └── vite.config.js
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── .env
└── README.md
```

# Here is a live website url fell free to check it out 👇👇
[Live Website](https://heavenly-pos-lob6.vercel.app)


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json files for details.

## Support

For support, please contact the development team or create an issue in the repository.
