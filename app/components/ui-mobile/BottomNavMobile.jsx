"use client";
import Link from "next/link";
import { FaHome, FaUser, FaTools } from "react-icons/fa";
import { FiBell } from "react-icons/fi";

export default function BottomNavMobile() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50 md:hidden">
      <Link
        href="/"
        className="flex flex-col items-center text-xs text-gray-700"
        aria-label="Home"
      >
        <FaHome className="text-lg" />
        <span>Home</span>
      </Link>
      <Link
        href="/services"
        className="flex flex-col items-center text-xs text-gray-700"
        aria-label="Services"
      >
        <FaTools className="text-lg" />
        <span>Services</span>
      </Link>
      <Link
        href="/well"
        className="flex flex-col items-center text-xs text-gray-700"
        aria-label="Well"
      >
        <FiBell className="text-lg" />
        <span>Well</span>
      </Link>
      <Link
        href="/account"
        className="flex flex-col items-center text-xs text-gray-700"
        aria-label="Account"
      >
        <FaUser className="text-lg" />
        <span>Account</span>
      </Link>
    </nav>
  );
}