"use client";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchData, useUpdateData } from "@/hooks/useApi";
import { useCookies } from "next-client-cookies";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const OrderDetails = () => {
  const cookies = useCookies();
    const token = cookies.get("henna-token");
  const params = useParams();
  const { id } = params;
  const {
    isLoading,
    error,
    data = [],
  } = useFetchData([`orderDetails-${id}`], `orders/order-details/${id}`, token);
  const updateOrderStatus = useUpdateData(
    [`orderDetails-${id}`, "dashboard", "orders"],
    `orders/update-order-status/${id}`,token
  );
  const { customerInformation, cartItems } = data;
  const statusStyles: any = {
    pending: "bg-blue-500 text-white",
    delivered: "bg-green-500 text-white",
    canceled: "bg-red-500 text-white",
  };

  const handleStatusChange = (newStatus: string) => {
    const updatedStatus = {
      status: newStatus,
    };
    try {
      updateOrderStatus.mutate(updatedStatus, {
        onSuccess: () => {
          toast.success("Order Status updated successfully");
        },
        onError: () => {
          toast.error("Failed to update order status!");
        },
      });
    } catch (error: any) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
      return;
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-5 py-5">
      <DynamicBreadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Orders", href: "/admin/orders" },
          { label: data?._id },
        ]}
      />
      <h2 className="text-xl font-semibold text-center text-textColor">
        Order ID: {data?._id}
      </h2>

      <div className="">
        <h3 className="font-bold text-primary">User Information:</h3>
        <p>
          <strong>Name:</strong>
          <span className="font-bold">{customerInformation?.name} </span>
        </p>
        {/* <p>
          <strong>Email:</strong> {order?.user.email}
        </p> */}
        <p>
          <strong>Phone:</strong> {customerInformation?.phone}
        </p>
      </div>

      <div className="">
        <h3 className="font-bold text-primary">Products:</h3>
        {cartItems?.map((product: any) => (
          <div
            key={product._id}
            className="flex items-center justify-between mt-2"
          >
            <div className="flex items-center">
              <img
                src={product?.productId?.image}
                alt={product?.productId?.name}
                className="w-16 h-16 mr-4"
              />
              <p>{product.productId.name}</p>
            </div>
            <p>
              {product.quantity} x ${product.price}
            </p>
          </div>
        ))}
      </div>

      <div className="">
        <h3 className="font-bold text-primary">Order Summary:</h3>
        <p>
          <strong>Subtotal:</strong> {data?.totalAmount}
        </p>

        <p>
          <strong>Courier Fee:</strong> {data?.courierServiceFee}
        </p>
        <p>
          <strong>Total:</strong> {data?.totalAmount + data?.courierServiceFee}
        </p>
      </div>

      <div className=" space-y-2">
        <h3 className="font-bold text-primary">Order Status:</h3>
        <div
          className={`px-4 py-2 rounded-md text-center ${
            statusStyles[data?.status] || "bg-gray-200 text-black"
          }`}
        >
          {data?.status}
        </div>
        <h3 className="font-bold text-primary">Update Order Status</h3>
        <Select
          value={data?.status as string}
          onValueChange={(newStatus) => handleStatusChange(newStatus)}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="">
        <p>
          <strong>Date:</strong> {new Date(data?.orderDate).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
