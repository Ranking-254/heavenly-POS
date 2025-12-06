import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Setup Ref
  const componentRef = useRef();

  // --- FIX: Logic moves inside onAfterPrint ---
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Heavenly Shop Receipt",
    onAfterPrint: () => {
      // This runs ONLY after the print dialog closes
      alert("Sale Successful!");
      setCart([]); 
      window.location.reload(); 
    }
  });

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to Cart Logic
  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Remove from Cart Logic
  const removeFromCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  // Calculate Total
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Handle Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      return alert("Cart is empty!");
    }

    try {
      const res = await api.post('/sales', {
        items: cart,
        totalAmount: totalAmount
      });

      if (res.status === 201) {
        // --- FIX: Just trigger print. The reload happens automatically after. ---
        console.log("Printer Ref:", componentRef.current);
        handlePrint(); 
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Transaction Failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* LEFT SECTION: THE CART */}
      <div className="w-1/3 bg-white shadow-xl flex flex-col h-full border-r border-gray-200">
        <div className="p-4 bg-blue-600 text-white flex items-center gap-2">
          <FaShoppingCart />
          <h2 className="text-xl font-bold">Current Sale</h2>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">Cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded shadow-sm border">
                <div>
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price} x {item.qty}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-blue-600">${item.price * item.qty}</span>
                  <button 
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer (Totals) */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-700 shadow-lg transition-colors"
            onClick={handleCheckout}
          >
            PAY NOW
          </button>
        </div>
      </div>

      {/* RIGHT SECTION: PRODUCT GRID */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
        
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                onClick={() => addToCart(product)}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-transparent hover:border-blue-500 flex flex-col items-center text-center h-48 justify-center group"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{product.sku}</p>
                <p className={`text-xs font-bold mb-2 ${product.stockQuantity < 5 ? 'text-red-500' : 'text-gray-500'}`}>
                  {product.stockQuantity === 0 ? "Out of Stock" : `In Stock: ${product.stockQuantity}`}
                </p>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

     {/* HIDDEN RECEIPT: Use 'overflow: hidden' instead of 'display: none' so the Ref can attach */}
{/* FAIL-SAFE FIX: 
         We are putting the receipt HTML directly here to ensure the Ref works.
      */}
      <div style={{ position: "absolute", left: "-10000px", top: "-10000px" }}>
        
        {/* Attach the ref DIRECTLY to this printable div */}
        <div ref={componentRef} className="p-4 bg-white text-black text-sm w-[300px] border border-gray-200">
          
          <div className="text-center mb-4">
            <h2 className="font-bold text-xl uppercase">Heavenly Shop</h2>
            <p className="text-xs">123 Market Street, Meru</p>
            <p className="text-xs">Tel: +254 700 000 000</p>
            <p className="text-xs mt-2 text-gray-500">{new Date().toLocaleString()}</p>
          </div>

          <hr className="border-black mb-2 border-dashed" />

          <div className="space-y-2 mb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.qty} x {item.name}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="border-black mb-2 border-dashed" />

          <div className="flex justify-between font-bold text-lg">
            <span>TOTAL</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className="text-center mt-6 text-xs">
            <p>Thank you for shopping with us!</p>
            <p>Goods once sold are not returnable.</p>
          </div>

        </div>
      </div>

    </div>
    );
};

    

export default POS;

  