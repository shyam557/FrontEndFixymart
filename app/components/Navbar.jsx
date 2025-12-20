"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import NavbarMobile from "./ui-mobile/NavbarMobile";
import BottomNavMobile from "./ui-mobile/BottomNavMobile";

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
      {/* Mobile Navigation Components */}
      <NavbarMobile />
      <BottomNavMobile />

      {/* ---------------- DESKTOP NAVBAR ---------------- */}
      <header className=" hidden md:block w-full bg-white z-50 h-16 fixed top-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* left logo + nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <img
                src="fixymart.jpeg"
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
                      <li  onClick={() => {
                          router.push("/profile");
                          setIsDropdownOpen(false);
                        }} className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors">
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
    </>
  );
}