"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOneSubCategoryServices } from "../../../src/lib/api/api";

const IMG_BASE = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG;

export default function ScrollingCard(props) {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchOneSubCategoryServices(props.subcategoryId);
      setServices(data);
      setLoading(false);
    }
    load();
  }, [props.subcategoryId]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading services...</p>;

  if (!services || services.length === 0)
    return <p className="text-gray-500">No services found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {props.categoryName}
        </h2>

        <Link
          href={`/services?type=${props.id}`}
          className="text-sm px-4 py-2 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-50 transition"
        >
          See all →
        </Link>
      </div>

      {/* Scrollable Card Row */}
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services?type=${props.id}`}
            className="flex-shrink-0 w-[170px] sm:w-[200px] md:w-[230px] 
                       bg-white border border-gray-200 rounded-2xl shadow-md 
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                       overflow-hidden"
          >
            {/* Title */}
            <div className="p-3 text-center">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {service.title}
              </h3>
            </div>

            {/* Image */}
            <div className="relative w-full h-[130px] sm:h-[150px] flex items-center justify-center bg-gray-50">
              <Image
                src={`${IMG_BASE}${service.image}`}
                alt={service.description}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Extra Info */}
            <div className="p-3 text-center border-t bg-gray-50">
              <p className="text-xs text-gray-600 truncate">
                {service.description}
              </p>
              <p className="text-sm font-semibold text-green-600 mt-1">
                ₹{service.custom_price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
