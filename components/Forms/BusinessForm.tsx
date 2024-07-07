"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/Loading"; // Ensure this path matches your setup

interface BusinessFormProps {
  initialData: {
    businessName: string;
    businessDescription: string;
    contactEmail: string;
    website?: string;
    tagline: string;
    industry?: string;
    logo: string;
    brandColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  businessId: string;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  initialData,
  businessId,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (name: string, color: string) => {
    setFormData((prev) => ({ ...prev, [name]: color }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewLogo(file);
      setFormData((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedData = { ...formData };
      const formDataToSend = new FormData();
      formDataToSend.append("businessName", updatedData.businessName);
      formDataToSend.append(
        "businessDescription",
        updatedData.businessDescription
      );
      formDataToSend.append("contactEmail", updatedData.contactEmail);
      formDataToSend.append("website", updatedData.website || "");
      formDataToSend.append("tagline", updatedData.tagline);
      formDataToSend.append("industry", updatedData.industry || "");
      formDataToSend.append("brandColor", updatedData.brandColor);
      formDataToSend.append("secondaryColor", updatedData.secondaryColor);
      formDataToSend.append("accentColor", updatedData.accentColor);
      formDataToSend.append("businessId", businessId);

      if (newLogo) {
        formDataToSend.append("logo", newLogo);
      } else {
        formDataToSend.append("logoUrl", updatedData.logo);
      }

      const response = await fetch(`/api/saveBusiness`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update business");
      }

      setIsEditing(false);
      router.refresh(); // Refresh the page to reflect updates
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    name: string,
    value: string,
    label: string,
    type: string = "text"
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-3 px-4"
            rows={4}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-3 px-4"
          />
        )
      ) : (
        <p className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-md bg-gray-100">
          {value}
        </p>
      )}
    </div>
  );

  const renderColorInput = (name: string, value: string, label: string) => (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(name, e.target.value)}
          className="h-10 w-10 border border-gray-300"
        />
      ) : (
        <div className="mt-1 flex items-center">
          <div
            className="h-10 w-10 rounded-full border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <p className="ml-4 text-gray-700">{value}</p>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Business Information</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="py-2 px-4 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderInput("businessName", formData.businessName, "Business Name")}
        {renderInput(
          "businessDescription",
          formData.businessDescription,
          "Business Description",
          "textarea"
        )}
        {renderInput(
          "contactEmail",
          formData.contactEmail,
          "Contact Email",
          "email"
        )}
        {renderInput("website", formData.website, "Website")}
        {renderInput("tagline", formData.tagline, "Tagline")}
        {renderInput("industry", formData.industry, "Industry")}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Logo
          </label>
          <div className="flex items-center mt-2">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300 mr-4">
              <Image
                src={formData.logo}
                alt="Business Logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
            {isEditing && (
              <label className="cursor-pointer py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">
                Change Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {renderColorInput("brandColor", formData.brandColor, "Brand Color")}
          {renderColorInput(
            "secondaryColor",
            formData.secondaryColor,
            "Secondary Color"
          )}
          {renderColorInput(
            "accentColor",
            formData.accentColor,
            "Accent Color"
          )}
        </div>
        {isEditing && (
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default BusinessForm;
