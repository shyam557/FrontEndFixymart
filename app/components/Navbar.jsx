"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { RiServiceLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const LocationButton = dynamic(() => import("./location/LocationButton.jsx"), {
  ssr: false,
});

export default function Navbar() {
  const items = useSelector((state) => state.cart.items || []);
  const cartItemCount = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const notificationCount = 1;
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileTop, setShowMobileTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('[data-dropdown-trigger]')) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ---------------- MOBILE TOP ---------------- */}
      <div className="block md:hidden fixed top-0 left-0 right-0 z-50 w-full bg-[#2874F0]">
        <div className="flex items-center justify-between px-4 pt-2">
          <LocationButton />
          <Link href="/cart" className="relative">
            <AiOutlineShoppingCart className="text-[1.4rem]" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartItemCount}
            </span>
          </Link>
        </div>
        <div className="px-4 pb-3">
          <SearchBar isMobile />
        </div>
      </div>

      {/* ---------------- DESKTOP NAVBAR ---------------- */}
      <header className=" hidden md:block w-full bg-white z-50 h-16 fixed top-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* left logo + nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <img
                src="/fixymart1.png"
                alt="FixyMart"
                className="h-16 w-full"
              />
            </Link>

            <nav className="flex space-x-8 text-gray-700 text-sm font-medium ">
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>
          </div>

          {/* right side */}
          <div className="flex items-center space-x-6">
            <LocationButton />

            <div className="w-60 ">
              <SearchBar />
            </div>

            {/* Notifications */}
            <button className="outline-none relative">
              <FiBell className="text-[1.3rem] text-gray-700 hover:text-white-black" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <AiOutlineShoppingCart className="text-[1.4rem] text-gray-700 hover:text-black " />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </Link>

            {/* ------------ LOGIN / ACCOUNT DROPDOWN ------------ */}
            {!isLoggedIn ? (
              <div className="relative" data-dropdown-trigger>
                {/* Click Button */}
                <div 
                  className="flex items-center cursor-pointer px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaRegUserCircle className="text-[1.30rem] text-gray-700" />
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white shadow-2xl rounded-lg z-50 opacity-100 border border-gray-200">
                    <div className="flex justify-between items-center px-4 text-sm text-black">
                      {/* <span>New customer?</span> */}
                     
                    </div>

                    <ul className=" text-sm text-black">         
                      <li className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors">
                        My Profile
                      </li>
                      <li
                        onClick={() => {
                          router.push("/orders");
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors"
                      >
                        My booking
                      </li>
                      <li className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors">
                        Help Center
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Sticky Border */}
      <div className="hidden md:block fixed top-16 left-0 right-0 h-px bg-gray-100 z-40" />

      {/* ---------------- MOBILE BOTTOM NAV ---------------- */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-400 flex justify-around items-center py-2 md:hidden z-50">
        <Link
          href="/"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <HiHome className="text-xl" />
          Home
        </Link>

        <Link
          href="/bookings"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <RiServiceLine className="text-xl" />
          Services
        </Link>

        <Link
          href="/well"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <FiBell className="text-xl" />
          Well
        </Link>

        <Link
          href="/account"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <FaRegUserCircle className="text-xl" />
          Account
        </Link>
      </nav>
    </>
  );
}
