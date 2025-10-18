"use client";

import Image from "next/image";
import Link from "next/link";

export default function SmartLockBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative w-full h-[250px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/smart-doorbell.png" // ensure this image exists in /public/images
          alt="Smart Door Lock"
          fill
          quality={100}
          className="object-cover"
          priority
        />

        {/* ₹2,000 off - Top Left */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-green-600 text-xs font-semibold px-3 py-1 rounded-full">
            ₹2,000 off
          </span>
        </div>

        {/* Content Section */}
        <div className="absolute inset-0 text-white flex items-end md:items-center px-6 md:px-12 pb-4 md:pb-0 pt-20">
          <div className="space-y-2 max-w-md md:ml-auto text-right w-full">
            {/* Text only on md+ */}
            <div className="hidden md:block space-y-2">
              <h2 className="text-xl font-semibold">Smart Doorbell Camera</h2>
              <p className="text-sm font-semibold">Installation video</p>
            </div>

            {/* Buy now button - mobile bottom-right */}
            <div className="flex justify-end">
              <Link
                href="/products/smart-lock"
                className="inline-block bg-white text-black text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Buy now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
