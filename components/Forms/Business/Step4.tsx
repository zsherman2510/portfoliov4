import React from "react";
import { useFormContext } from "react-hook-form";

const Step4: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="referral" className="block font-medium">
          How Did You Hear About Us? <span className="text-red-500">*</span>
        </label>
        <select
          id="referral"
          {...register("referral", {
            required: "This field is required",
            validate: (value) => value !== "", // Ensure value is not empty
          })}
          className={`mt-1 block w-full border rounded p-2 bg-base-200 ${
            errors.referral ? "border-red-500" : ""
          }`}
        >
          <option value="">Select an option</option> {/* Invalid option */}
          <option value="social_media">Social Media</option>
          <option value="search_engine">Search Engine</option>
          <option value="word_of_mouth">Word of Mouth</option>
          <option value="advertisement">Advertisement</option>
          <option value="other">Other</option>
        </select>
        {errors.referral && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.referral.message as string) || "This field is required"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step4;
