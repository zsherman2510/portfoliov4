import React from "react";
import DeleteUserForm from "@/components/DeleteUserForm";

const DeleteUserPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Delete Your Data
        </h1>
        <DeleteUserForm />
      </div>
    </div>
  );
};

export default DeleteUserPage;
