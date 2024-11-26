"use client";
import { getAllPosts } from "@/api/api"; // API function to fetch posts
import DynamicAlertDialogue from "@/components/share/DynamicAlertDialogue";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export type Post = {
  id: number;
  type: string; // "poster" or "manual"
  title?: string;
  description?: string;
  buttonName: string;
  link: string;
  imageUrl: string;
};

const PostDetails = () => {
  const params = useParams();
  const { id } = params;

  const { isLoading, error, data } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg">Error fetching data</p>;

  const post = data?.find((post: Post) => post.id === Number(id));
  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Posts", href: "/admin/post/all-posts" },
    { label: post?.title || "Post Details" },
  ];

  if (!post) return <p className="text-center text-lg">Post not found</p>;

  return (
    <>
      <div className="container mx-auto space-y-6">
        {/* Breadcrumb */}
        <DynamicBreadcrumb items={breadCrumbItems} />

        {/* Post Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src={post.imageUrl}
            alt={post.title || "Post Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Post Details */}
        <div className=" shadow-md rounded-lg p-6 space-y-4">
          {post.type !== "poster" && (
            <>
              <h1 className="text-2xl font-bold text-gray-900">
                {post.title || "Untitled Post"}
              </h1>
              <p className="text-gray-700">
                {post.description || "No description provided."}
              </p>
            </>
          )}
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {post.buttonName}
          </a>
        </div>

        <div className="flex space-x-4 w-full">
          <Link className="w-full" href={`/admin/post/edit/${post?.id}`}>
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
              onAction={() => {
                console.log("delete");
                alert("Product deleted successfully!");
              }}
              cancelText="Cancel"
              actionText="Delete"
              actionButtonClass={"bg-red-700 hover:bg-red-500 text-white"}
            />
          </div>
          <button
            className={`w-full ${
              post?.active
                ? "bg-green-700 text-textLight hover:bg-green-500"
                : "bg-yellow-600 text-textLight hover:bg-yellow-500"
            } py-2 px-4 rounded-md transition`}
            onClick={() => alert("Toggle Status Coming Soon!")}
          >
            {post?.active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
