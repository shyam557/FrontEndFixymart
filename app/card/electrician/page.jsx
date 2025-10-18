"use client";

import Image from "next/image";
import Link from "next/link";


export default function ElectricianServices() {
  const items = [
    {
      title: "Switch & Socket Repair",
      rating: "★ 4.79 (4K)",
      price: "₹149",
      image: "/images/en1.jpg",
    },
    {
      title: "Camera Repair/Installation",
      rating: "★ 4.80 (12K)",
      price: "₹199",
      image: "/images/en2.jpg",
    },
    {
      title: "Fan Installation",
      rating: "★ 4.85 (8K)",
      price: "₹129",
      image: "/images/fan1.jpg",
    },
    {
      title: "MCB Installation",
      rating: "★ 4.75 (5K)",
      price: "₹399",
      image: "/images/mcb.webp",
    },
    {
      title: "Tube Light Installation",
      rating: "★ 4.70 (3K)",
      price: "₹99",
      image: "/images/Tub-light-Installation-Repair.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold whitespace-nowrap">
          Electrician Services
        </h2>
        <Link
          href="/services?type=electrician"
          className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline whitespace-nowrap"
        >
          See all
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
        {items.map((item, index) => {
          const slug = item.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          return (
            <Link
              key={index}
              href={`/card/electrician/${slug}`}
              className="w-[220px] md:w-[230px] lg:w-[270px] flex-shrink-0"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-[340px] flex flex-col hover:scale-105 hover:shadow-md transition-transform duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative w-full h-52">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 270px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 pb-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.rating}</p>
                  </div>
                  <p className="text-sm font-semibold">{item.price}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
