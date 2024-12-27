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

const PostDetails = () => {
  const cookies = useCookies();
  const token = cookies.get("henna-token");
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { isLoading, error, data, refetch } = useFetchData(
    [`postDetails+id`],
    `hero-post/post-details/${id}`,
    token
  );
  const deletePost = useDeleteData(
    ["allPosts"],
    `hero-post/post-delete`,
    token
  );
  const handleDelete = (id: string) => {
    deletePost.mutate(id, {
      onSuccess: () => {
        refetch();
        toast.success("Post deleted successfully!");
        router.push("/admin/post/all-posts");
      },
      onError: () => {
        toast.error("Failed to delete Post!");
      },
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-lg">Error fetching data</p>;

  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Posts", href: "/admin/post/all-posts" },
    { label: data?.title || "Post Details" },
  ];

  if (!data) return <p className="text-center text-lg">Post not found</p>;

  return (
    <>
      <div className="container mx-auto space-y-6">
        {/* Breadcrumb */}
        <DynamicBreadcrumb items={breadCrumbItems} />

        {/* Post Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src={data?.image}
            alt={data?.title || "Post Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Post Details */}
        <div className=" shadow-md rounded-lg p-6 space-y-4">
          {data.type !== "poster" && (
            <>
              <h1 className="text-2xl font-bold text-gray-900">
                {data.title || "Untitled Post"}
              </h1>
              <p className="text-gray-700">
                {data.description || "No description provided."}
              </p>
            </>
          )}
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {data.buttonName}
          </a>
        </div>

        <div className="flex space-x-4 w-full">
          <Link className="w-full" href={`/admin/post/edit/${data?._id}`}>
            <button className="w-full bg-primary text-textLight py-2 px-4 rounded-md hover:bg-secondary transition">
              Edit Product
            </button>
          </Link>
          <div className="w-full flex justify-center items-center bg-red-600 text-textLight py-2 px-4 rounded-md hover:bg-red-500 transition">
            <DynamicAlertDialogue
              triggerText="Delete Product"
              triggerClass="w-full text-center"
              title={`Are sure yor want to delete ?`}
              content="This action cannot be undone. This will permanently delete your
            product and remove your product data from our servers."
              onAction={() => handleDelete(data?._id as string)}
              cancelText="Cancel"
              actionText="Delete"
              actionButtonClass={"bg-red-700 hover:bg-red-500 text-white"}
            />
          </div>
          <button
            className={`w-full ${
              data?.active
                ? "bg-green-700 text-textLight hover:bg-green-500"
                : "bg-yellow-600 text-textLight hover:bg-yellow-500"
            } py-2 px-4 rounded-md transition`}
            onClick={() => alert("Toggle Status Coming Soon!")}
          >
            {data?.active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
