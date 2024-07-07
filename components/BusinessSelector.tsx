"use client";

import { Popover, Transition } from "@headlessui/react";
import { useBusiness } from "@/context/BusinessContext";
import { useRouter } from "next/navigation";
import { FaPlus, FaBuilding } from "react-icons/fa";
import Image from "next/image";

const BusinessSelector = () => {
  const { selectedBusinessId, setSelectedBusinessId, businesses } =
    useBusiness();
  const router = useRouter();

  const handleSelect = (businessId: string, close: () => void) => {
    setSelectedBusinessId(businessId);
    close(); // Close the popover
    router.push(`/socialPosts`);
  };

  const handleAddBusiness = () => {
    router.push("/welcome");
  };

  const selectedBusiness = businesses?.find(
    (business) => business.id === selectedBusinessId
  );

  return (
    <Popover className="relative z-10">
      {({ open, close }) => (
        <>
          <Popover.Button className="btn bg-white rounded-md flex items-center hover:bg-white hover:shadow-[0_4px_10px_0_rgba(66,153,225,0.8)]">
            {selectedBusiness ? (
              <>
                <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-full bg-gray-100 mr-2">
                  <Image
                    src={selectedBusiness.logo}
                    alt="Business logo"
                    fill // Replaces `layout="fill"`
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop
                    style={{ objectFit: "cover" }} // Replaces `objectFit="cover"`
                  />
                </div>
                {selectedBusiness.businessName}
              </>
            ) : (
              <>
                <FaBuilding className="mr-2" />
                Select Business
              </>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 duration-200 opacity-50 ${
                open ? "transform rotate-180 " : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-64 transform">
              <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 bg-white p-4 hover:bg-white">
                {businesses?.map((business) => (
                  <div
                    key={business.id}
                    className="p-4 cursor-pointer flex items-center mb-2"
                    onClick={() => handleSelect(business.id, close)}
                  >
                    <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-full bg-gray-100 mr-2">
                      <Image
                        src={business.logo}
                        alt="Business logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {business.businessName}
                  </div>
                ))}
                <button
                  className="btn bg-white hover:bg-white w-full text-black flex items-center justify-center rounded mt-2 hover:shadow-[0_4px_10px_0_rgba(66,153,225,0.8)]"
                  onClick={handleAddBusiness}
                >
                  <FaPlus className="mr-2" />
                  Add New Business
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default BusinessSelector;
