"use client";
import React from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { FaInfoCircle, FaMinusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

interface ContentTopicsError {
  [key: number]: FieldError;
}

const Step1: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const [website, setWebsite] = useState(getValues("website") || "");
  const [insights, setInsights] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [contentTopics, setContentTopics] = useState<string[]>(
    getValues("contentTopics") || [""]
  );

  const handleScrape = async () => {
    if (!website) return;

    setScrapeLoading(true);
    try {
      const response = await fetch("/api/generateInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: website }),
      });

      if (!response.ok) {
        setScrapeLoading(false);
        throw new Error("Failed to scrape website");
      }

      const data = await response.json();

      if (!data || !data.insights) {
        setInsights("Failed to gather insights. Please try again.");
        setScrapeLoading(false);
        return;
      }

      console.log("Insights:", data);
      const combinedDescription = `${data.insights.overview}\n\n${data.insights.summary}`;
      setInsights(data.insights);
      setValue("businessDescription", combinedDescription || "");
      setValue("marketPosition", data.insights.market_position || "");
      setValue("notableInformation", data.insights.notable_information || "");
      setValue("overview", data.insights.overview || "");
      setValue("services", data.insights.services || "");
      setValue("targetAudience", data.insights.target_audience || "");
      setValue(
        "uniqueSellingProposition",
        data.insights.unique_selling_points || ""
      );
      setContentTopics(data.insights.content_topics || [""]);
      setScrapeLoading(false);
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error scraping website:", error);
      setInsights("Failed to gather insights. Please try again.");
      setScrapeLoading(false);
    }
  };

  useEffect(() => {
    if (insights && insights.content_topics) {
      setContentTopics(insights.content_topics);
    }
  }, [insights]);

  const addContentTopic = () => {
    setContentTopics([...contentTopics, ""]);
  };

  const removeContentTopic = (index: number) => {
    const updatedTopics = contentTopics.filter((_, i) => i !== index);
    setContentTopics(updatedTopics);
  };

  useEffect(() => {
    setValue("contentTopics", contentTopics);
  }, [contentTopics, setValue]);

  useEffect(() => {
    setValue("website", website);
  }, [website, setValue]);

  const contentTopicsErrors =
    errors.contentTopics as unknown as ContentTopicsError;

  return (
    <div className="space-y-4">
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          You can add your website URL to generate a detailed business
          description.
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="underline text-primary mt-2"
        >
          Add Website URL
        </button>
      </div>
      <div>
        <label
          htmlFor="businessName"
          className="block font-medium flex items-center"
        >
          Business Name
          <span className="text-red-500 ml-1">*</span>
          <span
            className="ml-2 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="Provide the name of your business. This will help us identify your business."
          >
            <FaInfoCircle className="w-5 h-5" />
          </span>
        </label>
        <input
          id="businessName"
          {...register("businessName", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full border rounded p-2 bg-slate-100 ${
            errors.businessName ? "border-red-500" : ""
          }`}
          placeholder="Enter your business name"
        />
        {errors.businessName && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.businessName.message as string) ||
              "This field is required"}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="industry"
          className="block font-medium flex items-center"
        >
          Industry
          <span className="text-red-500 ml-1">*</span>
          <span
            className="ml-2 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="Provide the industry your business operates in."
          >
            <FaInfoCircle className="w-5 h-5" />
          </span>
        </label>
        <input
          id="industry"
          {...register("industry", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full border rounded p-2 bg-slate-100 ${
            errors.industry ? "border-red-500" : ""
          }`}
          placeholder="Enter your industry"
        />
        {errors.industry && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.industry.message as string) || "This field is required"}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="businessDescription"
          className="block font-medium flex items-center"
        >
          Business Description
          <span className="text-red-500 ml-1">*</span>
          <span
            className="ml-2 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="Provide details about your business. For example, 'We are a bakery specializing in artisan bread and pastries.' This will help us understand your business better."
          >
            <FaInfoCircle className="w-5 h-5" />
          </span>
        </label>
        <textarea
          id="businessDescription"
          {...register("businessDescription", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full border rounded p-2 bg-slate-100 ${
            errors.businessDescription ? "border-red-500" : ""
          }`}
          rows={12}
          placeholder="Let us know what kind of business you have"
        />
        {errors.businessDescription && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.businessDescription.message as string) ||
              "This field is required"}
          </p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Enter Website URL"
      >
        <label
          htmlFor="website"
          className="block font-medium flex items-center"
        >
          Website URL
          <span
            className="ml-2 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="Provide the URL of your business website. We will analyze the website to generate insights about your business."
          >
            <FaInfoCircle className="w-5 h-5" />
          </span>
        </label>
        <input
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-1 block w-full border rounded p-2 bg-slate-100"
          placeholder="https://yourbusiness.com"
        />
        <button
          type="button"
          onClick={handleScrape}
          className="btn mt-4 btn-primary text-white rounded px-4 py-2"
          disabled={scrapeLoading}
        >
          {scrapeLoading ? "Loading..." : "Gather Insights"}
        </button>
      </Modal>

      <div>
        <label className="block font-medium">
          Writing Style <span className="text-red-500">*</span>
        </label>
        <select
          {...register("writingStyle", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full border rounded p-2 bg-base-200 ${
            errors.writingStyle ? "border-red-500" : ""
          }`}
        >
          <option value="formal">Formal</option>
          <option value="informal">Informal</option>
          <option value="humorous">Humorous</option>
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
        </select>
        {errors.writingStyle && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.writingStyle.message as string) ||
              "This field is required"}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium">
          Content Topics <span className="text-red-500">*</span>
        </label>
        {contentTopics.map((topic, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="text"
              {...register(`contentTopics.${index}` as const, {
                required: "This field is required",
              })}
              className={`flex-grow border rounded p-2 bg-base-200 ${
                contentTopicsErrors && contentTopicsErrors[index]
                  ? "border-red-500"
                  : ""
              }`}
              defaultValue={topic}
            />
            <button
              type="button"
              onClick={() => removeContentTopic(index)}
              className="ml-2 hover:text-red-700"
              title="Remove topic"
            >
              <FaMinusCircle />
            </button>
            {contentTopicsErrors && contentTopicsErrors[index] && (
              <p className="text-red-500 text-sm mt-1">
                {contentTopicsErrors[index]?.message ||
                  "This field is required"}
              </p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addContentTopic}
          className="btn btn-secondary mt-2"
        >
          Add More
        </button>
      </div>
      {contentTopics.length < 1 && (
        <p className="text-red-500 text-sm mt-1">
          Please add at least one content topic
        </p>
      )}
    </div>
  );
};

export default Step1;
