"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionData, checkLogIn } from "../../src/lib/auth/auth";
import Link from "next/link";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { removeToken } from "../../src/lib/auth/auth";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAuth = () => {
      const loggedIn = checkLogIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const data = getSessionData();
        setUserData(data);
      }

      setLoading(false);
    };

    checkUserAuth();
  }, []);

  const handleLogout = () => {
    removeToken();
    Cookies.remove("userData");
    setIsLoggedIn(false);
    setUserData(null);
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <FaUser className="text-5xl text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Not Logged In</h1>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
          <Link
            href="/auth/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // If logged in, show profile data
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUser className="text-4xl text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {userData?.name || "User"}
              </h1>
              <p className="text-gray-500">Account Profile</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <FaUser className="text-blue-600 text-lg" />
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="text-gray-800 font-semibold">
                  {userData?.name || "Not provided"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <FaEnvelope className="text-blue-600 text-lg" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-800 font-semibold">
                  {userData?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <FaPhone className="text-blue-600 text-lg" />
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-gray-800 font-semibold">
                  {userData?.phone || "Not provided"}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="text-gray-800 font-semibold">
                  {userData?.address || "Not provided"}
                </p>
              </div>
            </div>

            {/* User ID / Additional Info */}
            {userData?.id && (
              <div className="flex items-start gap-4 pt-4">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">User ID</p>
                  <p className="text-gray-800 font-semibold text-sm break-all">
                    {userData.id}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Raw Data (for debugging) */}
          <details className="mt-8 pt-8 border-t border-gray-200">
            <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
              Show all data
            </summary>
            <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto text-xs text-gray-700">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </details>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/orders"
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-blue-600 font-semibold transition-colors"
            >
              My Bookings
            </Link>
            <Link
              href="/"
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-purple-600 font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
