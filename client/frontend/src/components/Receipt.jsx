import React from 'react';

// We use forwardRef so the printing library can access this component
export const Receipt = React.forwardRef(({ cart, total, date }, ref) => {
  return (
    <div ref={ref} className="p-4 bg-white text-black text-sm w-[300px] mx-auto border border-gray-200">
      
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-bold text-xl uppercase">Heavenly Shop</h2>
        <p className="text-s">123 Market Street, Meru</p>
        <hr className="border-black mb-2 border-dashed" />
        <p className="text-s">Tel: +254 716700151</p>
        <hr className="border-black mb-2 border-dashed" />
        <p className="text-s">heavenlyshop@gmail.com</p>
        <hr className="border-black mb-2 border-dashed" />
        <p className="text-s mt-2 text-gray-500">{date}</p>
      </div>

      <hr className="border-black mb-2 border-dashed" />

      {/* Items */}
      <div className="space-y-2 mb-4">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.qty} x {item.name}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <hr className="border-black mb-2 border-dashed" />

      {/* Totals */}
      <div className="flex justify-between font-bold text-lg">
        <span>TOTAL</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 text-s">
        <p>Thank you for shopping with us!</p>
        <p>Goods once sold are not returnable.</p>
      </div>
    </div>
  );
});