import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";

const Delivery = () => {
  return (
    <div className="w-full rounded-xl border border-primary">
      <div className="w-full flex items-center gap-4 p-4 border-b border-b-primary">
        <div className="flex justify-center items-center">
          <FaShippingFast className="text-primary text-3xl" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Get Fast Delivery</h3>
          <p className="text-gray-600">
            After order you will get your products in 3 days.
          </p>
        </div>
      </div>
      <div className="w-full flex items-center gap-4 p-4">
        <div className="flex justify-center items-center">
          <HiShoppingBag className="text-primary text-3xl" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Cash On Delivery</h3>
          <p className="text-gray-600">
            After get the product you can complete the payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
