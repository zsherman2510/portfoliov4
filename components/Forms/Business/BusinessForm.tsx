"use client";

import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

interface FormData {
  businessDescription: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  tagline: string;
  socialHandle?: string;
  writingStyle: string;
  contentTopics?: string[];
  logo?: FileList;
  colors?: FileList;
  referral?: string;
  [key: string]: any;
}

const headers = [
  "Tell Us About Your Business",
  "Provide Your Contact Information",
  "Upload Your Logo and Brand Colors",
  "How Did You Hear About Us?",
];

const steps = ["Business", "Contact", "Branding", "Referral"];

const BusinessForm: React.FC = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      contentTopics: [""],
    },
    criteriaMode: "all",
  });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods;

  const [step, setStep] = useState(0); // Start from 0 to match the array index
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data } = useSession();

  const onSubmit: SubmitHandler<FormData> = async (bizInfo) => {
    try {
      const formData = new FormData();
      for (const key in bizInfo) {
        if (bizInfo[key]) {
          if (Array.isArray(bizInfo[key])) {
            bizInfo[key].forEach((value: string) =>
              formData.append(key, value)
            );
          } else if (bizInfo[key] instanceof FileList) {
            Array.from(bizInfo[key] as FileList).forEach((file) =>
              formData.append(key, file)
            );
          } else {
            formData.append(key, bizInfo[key] as string);
          }
        }
      }

      console.log(bizInfo, "bizInfo");

      formData.append("userId", data?.user?.id);
      formData.append("insights", JSON.stringify(bizInfo.insights));

      setLoading(true);

      const response = await fetch("/api/saveBusiness", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to save business data");
      }

      const { id } = await response.json();
      setLoading(false);
      console.log("Business data saved successfully");
      router.push(`/socialPosts/${id}`);
    } catch (error) {
      setLoading(false);
      console.error("Error saving business data:", error);
    }
  };

  const handleNext = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleStepClick = async (e: any, stepNumber: number) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      setStep(stepNumber);
    }
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto max-w-xl px-4 py-8">
        <div className="flex justify-center mb-8">
          {steps.map((label, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white cursor-pointer ${
                  step === index ? "bg-secondary" : "bg-gray-300"
                }`}
                onClick={(e) => handleStepClick(e, index)}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 border-t-2 border-gray-300" />
              )}
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">{headers[step]}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}
          {step === 3 && <Step4 />}

          <div className="flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn bg-gray-200 border-gray-700"
              >
                Previous
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={(e) => handleNext(e)}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default BusinessForm;
