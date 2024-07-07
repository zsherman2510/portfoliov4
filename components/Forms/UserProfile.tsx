"use client";
import React, { useState } from "react";
import Pricing from "@/components/Pricing";

interface UserProfileProps {
  initialData: {
    name: string;
    email: string;
    customerId: string;
    priceId: string;
    hasAccess: boolean;
    isAdmin: boolean;
    businesses: string[];
  };
  plan: string;
  businessLimit: number;
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  initialData,
  plan,
  businessLimit,
  userId,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-outline"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
            />
          ) : (
            <p className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100">
              {formData.name}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100">
            {formData.email}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <p className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100">
            {plan}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Businesses
          </label>
          <p className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100">
            {formData.businesses.length} / {businessLimit}
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          {isEditing && (
            <>
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </>
          )}
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Upgrade Account
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-gray-900">
                Upgrade Your Account
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <Pricing showFreeTier={false} />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
