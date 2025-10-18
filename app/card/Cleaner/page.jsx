"use client";

import Image from "next/image";
import Link from "next/link";
// import { CardContent } from "@/components/ui/card";

export default function CleaningServices() {
  const items = [
    {
      title: "Home Deep Cleaning",
      image: "/images/homecleaning.jpg",
    },
    {
      title: "Pest Control (includes utensil removal)",
      image: "/images/cleaner3.jpg",
    },
    {
      title: "Bathroom Deep Cleaning",
      image: "/images/bathroomcleaning.jpeg",
    },
    {
      title: "Foam-jet Sofa & AC Cleaning",
      image: "/images/sofa.jpg",
    },
    {
      title: "Termite Control Services",
      image: "/images/cleaning2.avif",
    },
  ];

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold whitespace-nowrap">
          Cleaning & Pest Control
        </h2>
        <Link
          href="/services?type=cleaning"
          className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline whitespace-nowrap"
        >
          See all
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
        {items.map((item, index) => {
          const slug = item.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          return (
            <Link
              key={index}
              href={`/card/Cleaner/${slug}`}
              className="w-[220px] md:w-[230px] lg:w-[270px] flex-shrink-0"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-[320px] flex flex-col hover:shadow-md transition">
                {/* Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 270px"
                    className="object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 pb-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
