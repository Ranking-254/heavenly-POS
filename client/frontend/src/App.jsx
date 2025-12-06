import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import POS from './pages/POS';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // <--- Import the Guard
import Register from './pages/Register';
import Footer from './pages/Footer';

// Helper component for the Navigation Bar (Logout Logic)
// Helper component for Navigation
const Layout = ({ children }) => {
  const navigate = useNavigate();
  
  // Get user info to check if they are Admin
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-white shadow p-4 mb-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="text-blue-600 font-bold hover:underline">Dashboard</Link>
          <Link to="/pos" className="text-gray-600 hover:text-blue-500">POS System</Link>
          <Link to="/add" className="text-gray-600 hover:text-blue-500">Inventory</Link>
          
          {/* ONLY ADMINS CAN SEE THIS BUTTON */}
          {user?.role === 'admin' && (
             <Link to="/register" className="text-purple-600 font-bold hover:text-purple-800 border border-purple-200 px-2 rounded">
               + Staff
             </Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Hi, {user?.username}</span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          
          {/* Public Route (No Guard) */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (Wrapped in PrivateRoute & Layout) */}
          <Route path="/" element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          } />
          
          <Route path="/add" element={
            <PrivateRoute>
              <Layout><AddProduct /></Layout>
            </PrivateRoute>
          } />

          <Route path="/pos" element={
            <PrivateRoute>
              <Layout><POS /></Layout>
            </PrivateRoute>
          } />
          <Route path="/register" element={
  <PrivateRoute>
    <Layout><Register /></Layout>
  </PrivateRoute>
} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;