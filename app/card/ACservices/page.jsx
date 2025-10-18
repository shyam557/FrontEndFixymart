"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "AC Service & Repair", image: "/images/ac4.avif" },
  { title: "Washing Machine", image: "/images/washingmachine.avif" },
  { title: "Television", image: "/images/tv1.webp" },
  { title: "Geyser", image: "/images/geyser2.png" },
  { title: "Air Cooler", image: "/images/aircooler1.webp" },
];

export default function ScrollingCard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Heading and See all link */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
          Appliance Service & Repair
        </h2>
        <Link
          href="/services?type=ac"
          className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline whitespace-nowrap"
        >
          See all
        </Link>
      </div>

      {/* Scrollable cards */}
      <div
        className="flex gap-3 md:gap-6 scroll-smooth overflow-x-auto scrollbar-hide pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service, idx) => (
          <Link
            key={idx}
            href={`/card/ACservices/${service.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="flex-shrink-0 w-[160px] h-[200px] sm:w-[190px] sm:h-[230px] md:w-[220px] md:h-[260px] lg:w-[240px] lg:h-[280px] 
            bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center 
            hover:border-gray-300 transition-all duration-300 overflow-hidden"
            style={{ textDecoration: 'none' }}
          >
            <div className="w-full px-2 pt-3 pb-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center truncate">
              {service.title}
            </div>
            <div className="relative w-full flex-1 flex items-center justify-center">
              <Image
                src={service.image}
                alt={service.title}
                width={140}
                height={140}
                className="object-contain sm:w-[160px] sm:h-[140px] md:w-[200px] md:h-[160px] lg:w-[220px] lg:h-[180px]"
                quality={100}
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
