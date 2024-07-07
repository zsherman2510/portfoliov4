import React from "react";
import { useFormContext } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";

const Step2: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="contactEmail" className="block font-medium">
          Contact Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="contactEmail"
          {...register("contactEmail", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
          className={`mt-1 block w-full border rounded p-2 bg-base-200 ${
            errors.contactEmail ? "border-red-500" : ""
          }`}
        />
        {errors.contactEmail && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.contactEmail.message as string) ||
              "This field is required"}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="tagline"
          className="block font-medium flex items-center"
        >
          Tagline/Caption <span className="text-red-500">*</span>
          <span
            className="inline-block ml-2 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="A short and catchy phrase that describes your business. This will be used in your social media posts."
          >
            <FaInfoCircle className="w-5 h-5" />
          </span>
        </label>
        <input
          type="text"
          id="tagline"
          {...register("tagline", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full border rounded p-2 bg-base-200 ${
            errors.tagline ? "border-red-500" : ""
          }`}
          placeholder="Your business tagline"
        />
        {errors.tagline && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.tagline.message as string) || "This field is required"}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="socialHandle" className="block font-medium">
          Main Social Handle <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="@username"
          id="socialHandle"
          {...register("socialHandle", {
            required: "This field is required",
          })}
          className={`mt-1 block w-full border rounded p-2 bg-base-200 ${
            errors.socialHandle ? "border-red-500" : ""
          }`}
        />
        {errors.socialHandle && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.socialHandle.message as string) ||
              "This field is required"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step2;
