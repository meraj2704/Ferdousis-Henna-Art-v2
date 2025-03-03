"use client";
import ButtonF from "@/components/customUi/ButtonF";
import SectionTitle from "@/components/customUi/SectionTitle";
import ProductCart from "@/components/share/ProductsCart";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks/useApi";
import { addToCart } from "@/redux/Reducer/cartSlice";
import { useAppDispatch } from "@/redux/Store/store";
import { Product } from "@/types/Types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { format } from "date-fns"; // For formatting the offer date

const ProductsHome = () => {
  const dispatch = useAppDispatch();
  const {
    data: products,
    isLoading,
    error,
  } = useFetchData(["homeProducts"], `product/home-products`);
  const {
    data: offers,
    isLoading: offersLoading,
    error: offersError,
  } = useFetchData(["offers"], `/get-all-offers`);

  const [showOfferModal, setShowOfferModal] = useState(false);
  const offer = offers?.[0]; // Assuming only one offer is active at a time

  useEffect(() => {
    const hasSeenOffer = localStorage.getItem("hasSeenOffer");
    if (!hasSeenOffer && offer && offer.isActive) {
      setShowOfferModal(true);
    }
  }, [offer]);

  const handleAddToCart = React.useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
      toast.success("Product added successfully");
    },
    [dispatch]
  );

  const closeOfferModal = () => {
    setShowOfferModal(false);
    // localStorage.setItem("hasSeenOffer", "true");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-20 flex flex-col md:flex-row items-center justify-between gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-[300px] h-[300px] md:h-[400px] rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <p className="text-lg text-red-600">
          Failed to fetch products: {error.message}
        </p>
        <ButtonF variant="primary" onClick={() => window.location.reload()}>
          Retry
        </ButtonF>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 md:px-2">
      {/* Offer Modal */}
      <Dialog open={showOfferModal} onOpenChange={closeOfferModal}>
        <DialogContent className="max-w-md md:max-w-lg p-6 rounded-xl shadow-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center text-primary">
              🎉 {offer?.name} 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-lg font-semibold mt-2">
              Get an exclusive offer on{" "}
              <span className="text-primary">{offer?.product}</span>!
            </p>
            <p className="text-md text-gray-700 mt-2">
              Buy at least{" "}
              <span className="font-bold">{offer?.minQuantity}</span> and enjoy{" "}
              <span className="text-red-500">
                {offer?.discountType === "free_delivery"
                  ? "Free Delivery 🚚"
                  : "Exclusive Discount"}
              </span>
              .
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <Link href={'/products'}>
              <ButtonF variant="primary" onClick={closeOfferModal}>
                Grab the Offer
              </ButtonF>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <SectionTitle title="Products" width="w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4">
        {products?.map((product: Product) => (
          <ProductCart
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 lg:mt-6">
        <Link href={"/products"}>
          <ButtonF variant="primary">See All</ButtonF>
        </Link>
      </div>
    </div>
  );
};

export default ProductsHome;
