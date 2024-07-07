import React from "react";
import { useFormContext } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";

const Step3: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const logo = watch("logo");

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <label className="block font-medium mb-2 text-center">
          Upload Logo <span className="text-red-500">*</span>
        </label>
        <label
          htmlFor="logo"
          className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer"
        >
          {logo && logo.length > 0 ? (
            <img
              src={URL.createObjectURL(logo[0])}
              alt="Logo Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-2xl">+</div>
          )}
          <input
            type="file"
            id="logo"
            {...register("logo", {
              required: "This field is required",
            })}
            className="hidden"
          />
        </label>
        {errors.logo && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.logo.message as string) || "This field is required"}
          </p>
        )}
      </div>
      <div className="space-y-4">
        <label
          htmlFor="colors"
          className="block font-medium mb-2 flex items-center"
        >
          Upload Colors <span className="text-red-500">*</span>
          <span
            className="inline-block ml-2 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="Select the colors you want to use for your posts. This helps in maintaining brand consistency."
          >
            <FaInfoCircle className="w-5 h-5" />
          </span>
        </label>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-500 mb-1">Brand Color</label>
            <input
              type="color"
              id="brandColor"
              {...register("brandColor", {
                required: "This field is required",
              })}
              className={`w-12 h-12 border border-gray-300 rounded-lg ${
                errors.brandColor ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-500 mb-1">
              Secondary Color
            </label>
            <input
              type="color"
              id="secondaryColor"
              {...register("secondaryColor", {
                required: "This field is required",
              })}
              className={`w-12 h-12 border border-gray-300 rounded-lg ${
                errors.secondaryColor ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-500 mb-1">Accent Color</label>
            <input
              type="color"
              id="accentColor"
              {...register("accentColor", {
                required: "This field is required",
              })}
              className={`w-12 h-12 border border-gray-300 rounded-lg ${
                errors.accentColor ? "border-red-500" : ""
              }`}
            />
          </div>
        </div>
        {errors.brandColor && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.brandColor.message as string) || "This field is required"}
          </p>
        )}
        {errors.secondaryColor && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.secondaryColor.message as string) ||
              "This field is required"}
          </p>
        )}
        {errors.accentColor && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.accentColor.message as string) || "This field is required"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step3;
