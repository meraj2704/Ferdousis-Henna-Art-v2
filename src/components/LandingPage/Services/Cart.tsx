// Cart.tsx
import React from "react";

interface CartProps {
  name: string;
  icon: React.ReactNode; // This will allow you to pass icons as JSX
}

const Cart: React.FC<CartProps> = ({ name, icon }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold">{name}</h3>
    </div>
  );
};

export default Cart;
