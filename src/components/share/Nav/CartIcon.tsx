"use client";
import { RootState, useAppSelector } from "@/redux/Store/store";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

const CartIcon = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative">
      {items.length > 0 && (
        <div className="absolute -top-2 -left-2 bg-primary text-white w-5 h-5 text-xs flex justify-center items-center rounded-full p-1">
          {items.length}
        </div>
      )}
      <CiShoppingCart className="text-textColor text-2xl hover:text-primary" />
    </div>
  );
};

export default CartIcon;
