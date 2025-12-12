"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SearchBar from "../search/SearchBar";

const LocationButton = dynamic(() => import("../location/LocationButton.jsx"), {
  ssr: false,
});

export default function NavbarMobile() {
  const items = useSelector((state) => state.cart.items || []);
  const cartItemCount = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-purple-300 md:hidden pb-2 shadow-md">

      {/* 📍 Location + Cart */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex-1">
          <LocationButton />
        </div>

        <Link href="/cart" className="relative ml-3">
          <AiOutlineShoppingCart className="text-[1.5rem] text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full font-medium">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>

      {/* 🔍 Search Bar */}
      <div className="px-3 pb-2">
        <SearchBar isMobile />
      </div>
    </div>
  );
}