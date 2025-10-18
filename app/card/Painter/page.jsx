"use client";

import Image from "next/image";
import Link from "next/link";
// import { CardContent } from "../../../components/ui/card";

export default function PainterServices() {
  const items = [
    {
      title: "Rooms/walls painting consultation",
      rating: "★ 4.79 (4K)",
      price: "₹49",
      image: "/images/painter-home.jpg",
    },
    {
      title: "Textured Paint Designs",
      rating: "★ 4.79 (106K)",
      price: "₹1,098",
      image: "/images/Textured-Paint-Designs.webp",
    },
    {
      title: "Interior Wall Painting",
      rating: "★ 4.80 (35K)",
      price: "₹1,498",
      image: "/images/wall-painting.jpg",
    },
    {
      title: "Terrace Waterproofing Paint",
      rating: "★ 4.78 (1.5M)",
      price: "₹599",
      image: "/images/painting.jpg",
    },
    {
      title: "Home Painting Consultation",
      rating: "★ 4.83 (15K)",
      price: "₹3,999",
      image: "/images/painter-house.webp",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold whitespace-nowrap">
          Painter Services
        </h2>
        <Link
          href="/services?type=painter"
          className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline whitespace-nowrap"
        >
          See all
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2 scroll-smooth">
        {items.map((item, index) => {
          const slug = item.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          return (
            <Link
              key={index}
              href={`/card/Painter/${slug}`}
              className="w-[220px] md:w-[230px] lg:w-[270px] flex-shrink-0"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-[360px] flex flex-col hover:scale-105 hover:shadow-md transition-transform duration-300 cursor-pointer">
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
