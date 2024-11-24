"use client";
import { getAlOrders } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const OrderDetails = () => {
  const params = useParams();
  const { id } = params;
  const { isLoading, error, data } = useQuery({
    queryKey: ["allOrders", id],
    queryFn: getAlOrders,
  });

  const order = data?.find((order: Order) => order.orderId === String(id));
  const statusStyles: any = {
    Processing: "bg-blue-500 text-white",
    Delivered: "bg-green-500 text-white",
    Canceled: "bg-red-500 text-white",
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    // setStatus(newStatus);
    // Add your logic to update the order status in the backend here.
  };

  return (
    <div className="container mx-auto px-3">
      <h2 className="text-xl font-semibold text-center text-textColor">
        Order ID: {order?.orderId}
      </h2>

      <div className="mt-4">
        <h3 className="font-bold text-primary">User Information:</h3>
        <p>
          <strong>Name:</strong> {order?.user.name}
        </p>
        <p>
          <strong>Email:</strong> {order?.user.email}
        </p>
        <p>
          <strong>Phone:</strong> {order?.user.phone}
        </p>
        <p>
          <strong>Address:</strong> {order?.user.address.courierOfficeName},{" "}
          {order?.user.address.location}, {order?.user.address.state},{" "}
          {order?.user.address.district}, {order?.user.address.upazila}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-primary">Products:</h3>
        {order?.products.map((product: any) => (
          <div
            key={product.id}
            className="flex items-center justify-between mt-2"
          >
            <div className="flex items-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 mr-4"
              />
              <p>{product.name}</p>
            </div>
            <p>
              {product.quantity} x ${product.price}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-primary">order? Summary:</h3>
        <p>
          <strong>Subtotal:</strong> ${order?.orderDetails.subtotal}
        </p>
        <p>
          <strong>Tax:</strong> ${order?.orderDetails.tax}
        </p>
        <p>
          <strong>Shipping Fee:</strong> ${order?.orderDetails.shippingFee}
        </p>
        <p>
          <strong>Total:</strong> ${order?.orderDetails.total}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-primary">Order Status:</h3>
        <div
          className={`px-4 py-2 rounded-md text-center ${
            statusStyles[order?.orderStatus] || "bg-gray-200 text-black"
          }`}
        >
          {order?.orderStatus}
        </div>
        <Select
          value={order?.orderStatus}
          onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)}
        >
          <SelectTrigger className="w-full bg-background mt-4">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <p>
          <strong>Payment Status:</strong> {order?.paymentStatus}
        </p>
        <p>
          <strong>Payment Method:</strong> {order?.paymentMethod}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(order?.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(order?.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
