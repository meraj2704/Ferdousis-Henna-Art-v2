"use client";
import { useAppSelector, useAppDispatch } from "@/redux/Store/store";
import { removeFromCart, updateQuantity } from "@/redux/Reducer/cartSlice";
import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/Types";

interface CartProductI extends Product {
  quantity: number;
}

const CartPage = ({
  setOpenDrawer,
}: {
  setOpenDrawer?: (val: boolean) => void;
}) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemoveItem = (id: string, name: string) => {
    dispatch(removeFromCart(id));
    toast.error(`${name} removed from cart!`);
  };

  const handleIncreaseQuantity = (item: CartProductI) => {
    dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = (item: CartProductI) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  };

  const getTotalSavings = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (!isClient) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-2 py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h1>
        <Link href="/" className="mt-4 text-primary text-lg hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className="w-full flex justify-between items-center mb-6 mt-6">
        <h1 className="text-2xl text-gray-800">Your Cart</h1>
        <Link href={"/products"}>
          <div className="text-primary flex items-center gap-2">
            <Plus className="font-bold text-2xl" />
            <h1 className="hover:underline text-xl font-medium">Add More</h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Cart Item List */}
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="w-full flex justify-between gap-2 items-center border-b border-b-accent py-2"
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="flex flex-col">
                  <Link href={`/products/${item._id}`}>
                    <h2 className="text-base lg:text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                  </Link>
                  <div className="flex items-end gap-2">
                    <p className="text-gray-800 mt-2">
                      {item.discountedPrice.toFixed(2)}{" "}
                      <span className="text-sm">TK</span>
                    </p>
                    {item.discountPercentage > 0 && (
                      <span className="text-sm line-through text-gray-500">
                        ({item.price} TK)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between gap-10 items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-primary transition"
                    >
                      <FaMinus className="text-sm text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-primary transition"
                    >
                      <FaPlus className="text-sm text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item._id, item.name)}
              className="text-gray-600 hover:text-red-600 transition"
            >
              <IoTrashOutline className="text-xl" />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col justify-between items-center mt-6">
        <div className="text-lg font-semibold text-gray-800 flex gap-2">
          <p>
            Total: {getTotalPrice().toFixed(2)} <span className="">TK</span>
          </p>
          {getTotalSavings() > getTotalPrice() && (
            <p className="text-sm line-through text-red-500 mt-1">
              {getTotalSavings().toFixed(2)} TK!
            </p>
          )}
        </div>
        <button
          onClick={() => {
            if (setOpenDrawer) {
              setOpenDrawer(false);
            }
            router.push("/check-out");
          }}
          className="w-full text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
