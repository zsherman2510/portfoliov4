"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

interface WritingFormProps {
  initialData: {
    writingStyle: string;
    contentTopics: string[];
    marketPosition: string;
    notableInformation: string;
    overview: string;
    services: string[];
    targetAudience: string;
    uniqueSellingPoints: string[];
  };
  businessId: string;
}

const WritingForm: React.FC<WritingFormProps> = ({
  initialData,
  businessId,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newService, setNewService] = useState("");
  const [newUSP, setNewUSP] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    arrayName: keyof typeof formData,
    index: number,
    value: string
  ) => {
    const updatedArray = [...(formData[arrayName] as string[])];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleAddItem = (
    arrayName: keyof typeof formData,
    newItem: string,
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (newItem.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: [...(prev[arrayName] as string[]), newItem],
      }));
      setNewItem("");
    }
  };

  const handleRemoveItem = (
    arrayName: keyof typeof formData,
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const method = initialData ? "PUT" : "POST";
      const response = await fetch(`/api/writing/${businessId}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update writing");
      }

      setIsEditing(false);
      router.refresh(); // Refresh the page to reflect updates
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Writing</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Writing Style
            </label>
            <select
              name="writingStyle"
              value={formData.writingStyle}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2 bg-base-200"
            >
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="humorous">Humorous</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          {[
            { label: "Market Position", name: "marketPosition" },
            { label: "Notable Information", name: "notableInformation" },
            { label: "Overview", name: "overview" },
            { label: "Target Audience", name: "targetAudience" },
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <textarea
                name={field.name}
                value={formData[field.name as keyof typeof formData]} // Type assertion here
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-3 px-4"
                rows={6}
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Content Topics
            </label>
            {formData.contentTopics.map((topic, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) =>
                    handleArrayChange("contentTopics", index, e.target.value)
                  }
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("contentTopics", index)}
                  className="ml-2 text-red-600 hover:text-red-700"
                  title="Remove topic"
                >
                  <FaMinusCircle />
                </button>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Add a new topic"
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddItem("contentTopics", newTopic, setNewTopic)
                }
                className="ml-2 text-green-600 hover:text-green-700"
                title="Add new topic"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Services
            </label>
            {formData.services.map((service, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) =>
                    handleArrayChange("services", index, e.target.value)
                  }
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("services", index)}
                  className="ml-2 text-red-600 hover:text-red-700"
                  title="Remove service"
                >
                  <FaMinusCircle />
                </button>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add a new service"
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddItem("services", newService, setNewService)
                }
                className="ml-2 text-green-600 hover:text-green-700"
                title="Add new service"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Unique Selling Points
            </label>
            {formData.uniqueSellingPoints.map((usp, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={usp}
                  onChange={(e) =>
                    handleArrayChange(
                      "uniqueSellingPoints",
                      index,
                      e.target.value
                    )
                  }
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("uniqueSellingPoints", index)}
                  className="ml-2 text-red-600 hover:text-red-700"
                  title="Remove unique selling point"
                >
                  <FaMinusCircle />
                </button>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={newUSP}
                onChange={(e) => setNewUSP(e.target.value)}
                placeholder="Add a new unique selling point"
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddItem("uniqueSellingPoints", newUSP, setNewUSP)
                }
                className="ml-2 text-green-600 hover:text-green-700"
                title="Add new unique selling point"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Writing Style</h2>
            <p className="mt-1 block w-full rounded-md border-gray-200 shadow-sm py-3 px-4">
              {formData.writingStyle}
            </p>
          </div>
          {[
            { label: "Market Position", value: formData.marketPosition },
            {
              label: "Notable Information",
              value: formData.notableInformation,
            },
            { label: "Overview", value: formData.overview },
            { label: "Target Audience", value: formData.targetAudience },
          ].map((field) => (
            <div className="mb-4" key={field.label}>
              <h2 className="text-lg font-medium text-gray-700">
                {field.label}
              </h2>
              <p className="mt-1 block w-full rounded-md border-gray-200 shadow-sm py-3 px-4">
                {field.value}
              </p>
            </div>
          ))}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              Content Topics
            </h2>
            {formData.contentTopics.map((topic, index) => (
              <div key={index} className="flex items-center mt-2">
                <p className="flex-grow rounded-md border-gray-200 shadow-sm py-2 px-4">
                  {topic}
                </p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Services</h2>
            {formData.services.map((service, index) => (
              <div key={index} className="flex items-center mt-2">
                <p className="flex-grow rounded-md border-gray-200 shadow-sm py-2 px-4">
                  {service}
                </p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              Unique Selling Points
            </h2>
            {formData.uniqueSellingPoints.map((usp, index) => (
              <div key={index} className="flex items-center mt-2">
                <p className="flex-grow rounded-md border-gray-200 shadow-sm py-2 px-4">
                  {usp}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingForm;
