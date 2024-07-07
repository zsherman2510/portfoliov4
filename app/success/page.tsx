"use client";
import Link from "next/link";
const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Success!</h1>
        <p className="mt-4 text-lg">
          Your payment was successful. Updating your account...
        </p>
        <Link href="/socialPosts">
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Go to Social Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
