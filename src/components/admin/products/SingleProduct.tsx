"use client";
import DynamicAlertDialogue from "@/components/share/DynamicAlertDialogue";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import Loader from "@/components/share/Loader";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AdminProductDetails = () => {
  const cookies = useCookies();
    const token = cookies.get("henna-token");
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  // data fetch
  const {
    data: product,
    isLoading,
    error,
  } = useFetchData(["product"], `product/product-details/${id}`,token);
// delete products
  const deleteProduct = useDeleteData(["products"], `product/product-delete`,token);
  const handleDelete = (id: string) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        router.push("/admin/products/all-products");
      },
      onError: () => {
        toast.error("Failed to delete product!");
      },
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching data</p>;
// bread crumbs lists
  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Products", href: "/admin/products/all-products" },
    { label: product?.name },
  ];
  if (!product) return <p>Product not found</p>;

  return (
    <div className="min-h-screen bg-background text-textColor px-4 py-10">
      <div className="container mx-auto space-y-6">
        <DynamicBreadcrumb items={breadCrumbItems} />
        <div className="flex flex-col md:flex-row items-start md:space-x-6">
          <div className="relative w-full md:w-1/2 h-64 md:h-80">
            <Image
              src={product?.image}
              alt={product?.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-start items-start space-y-4 mt-4 lg:mt-0">
            <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
            <p className="text-textColor leading-relaxed">
              {product.description}
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-secondary">Category:</span>{" "}
                {product.category || "Not specified"}
              </p>
              <p>
                <span className="font-medium text-secondary">Price:</span>{" "}
                <span className="text-accent font-semibold">
                  ${product.price}
                </span>
              </p>
              <p>
                <span className="font-medium text-secondary">Stock:</span>{" "}
                <span
                  className={`font-semibold ${
                    product.stock && product.stock > 0
                      ? "text-accent"
                      : "text-secondary"
                  }`}
                >
                  {product.stock && product.stock > 0
                    ? `${product.stock} units available`
                    : "Out of stock"}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Sales and Performance */}
        <div className="bg-complementary p-6 rounded-lg shadow text-textLight">
          <h2 className="text-xl font-bold text-textLight border-b">
            Performance
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-medium text-background">
                  Total Sales:
                </span>{" "}
                {product.totalSales || 0}
              </p>
              <p>
                <span className="font-medium text-background">
                  Revenue Generated:
                </span>{" "}
                ${product.revenueGenerated || 0}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-background">Created At:</span>{" "}
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleDateString()
                  : "Not available"}
              </p>
              <p>
                <span className="font-medium text-background">Status:</span>{" "}
                {product.active ? (
                  <span className="text-accent font-semibold">Active</span>
                ) : (
                  <span className="text-secondary font-semibold">Inactive</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 w-full">
          <Link className="w-full" href={`/admin/products/edit/${product?.id}`}>
            <button className="w-full bg-primary text-textLight py-2 px-4 rounded-md hover:bg-secondary transition">
              Edit Product
            </button>
          </Link>
          <div className="w-full flex justify-center items-center bg-red-600 text-textLight py-2 px-4 rounded-md hover:bg-red-500 transition">
            <DynamicAlertDialogue
              triggerText="Delete Product"
              triggerClass="w-full text-center"
              title={`Are sure yor want to delete ${product.name}?`}
              content="This action cannot be undone. This will permanently delete your
            product and remove your product data from our servers."
              onAction={() => handleDelete(product?._id)}
              cancelText="Cancel"
              actionText="Delete"
              actionButtonClass={"bg-red-700 hover:bg-red-500 text-white"}
            />
          </div>
          <button
            className={`w-full ${
              product.active
                ? "bg-green-700 text-textLight hover:bg-green-500"
                : "bg-yellow-600 text-textLight hover:bg-yellow-500"
            } py-2 px-4 rounded-md transition`}
            onClick={() => alert("Toggle Status Coming Soon!")}
          >
            {product.active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
