import React from "react";
import { toast } from "sonner";

type MessageProps = {
  name: string;
  email: string;
  message: string;
};

const MessageCard: React.FC<MessageProps> = ({ name, email, message }) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied successfully");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold text-gray-800">Name: {name}</h2>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <p className="text-sm text-gray-600">Email: {email}</p>
        <button
          onClick={handleCopyEmail}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Copy Email
        </button>
      </div>
      <p className="text-gray-700 mt-2">Message: {message}</p>
    </div>
  );
};

export default MessageCard;
