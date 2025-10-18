"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Carpenterservice() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    return () => {
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [router]);

  const items = [
    {
      title: "Wardrobe Design Consultation",
      rating: "★ 4.79 (4K)",
      price: "₹49",
      image: "/images/almari1.avif",
    },
    {
      title: "Modular Sofa Installation",
      rating: "★ 4.79 (106K)",
      price: "₹1,098",
      image: "/images/sofa.jpeg",
    },
    {
      title: "TV panel Installation",
      rating: "★ 4.80 (35K)",
      price: "₹1,498",
      image: "/images/tv-frame.webp",
    },
    {
      title: "Wooden Door Installation & Repair",
      rating: "★ 4.78 (1.5M)",
      price: "₹599",
      image: "/images/carpenter-door.jpg",
    },
    {
      title: "Furniture Polishing",
      rating: "★ 4.83 (15K)",
      price: "₹3,999",
      image: "/images/wood-polish-service.webp",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold whitespace-nowrap">Carpenter Services</h2>
        <Link
          href="/services?type=carpenter"
          className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline"
        >
          See all
        </Link>
      </div>

      {/* Scrollable Card Section */}
      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
        {items.map((item, index) => {
          const slug = item.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          return (
            <Link
              key={index}
              href={`/card/carpenter/${slug}`}
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
