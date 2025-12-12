"use client";

import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { RiServiceLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

export default function BottomNavMobile() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-100 flex justify-around items-center py-2 md:hidden z-50">
      <Link
        href="/"
        className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        <HiHome className="text-xl mb-1" />
        <span>Home</span>
      </Link>

      <Link
        href="/services?type=3dc52367-755d-45dc-9bf4-7e7a217d25c4"
        className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        <RiServiceLine className="text-xl mb-1" />
        <span>Services</span>
      </Link>

      <Link
        href="/orders"
        className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        <FiBell className="text-xl mb-1" />
        <span>Orders</span>
      </Link>

      <Link
        href="/auth/login"
        className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        <FaRegUserCircle className="text-xl mb-1" />
        <span>Accounts</span>
      </Link>
    </nav>
  );
}