"use client";

import HeroSection from "./components/Herosection";
import { fetchAllCategories, fetchTopServices } from "../src/lib/api/api";
import { useEffect, useState } from "react";
import SingleService from "./card/SingleService/page";
import Image from "next/image";
import Link from "next/link";

const IMG_BASE = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG;

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topServices, setTopServices] = useState([]);
  const [topLoading, setTopLoading] = useState(true);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchAllCategories();
      setCategories(data);
      setLoading(false);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadTopServices() {
      try {
        const data = await fetchTopServices();
        setTopServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch top services:", err);
        setTopServices([]);
      } finally {
        setTopLoading(false);
      }
    }
    loadTopServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="relative overflow-visible">
      <HeroSection data={categories} />

      {/* Featured Top Services */}
      {!topLoading && topServices.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Services
          </h2>

          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {topServices.map((item, index) => {
              const slug = item.description
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

              return (
                <Link
                  key={index}
                  href={`/card/Cleaner/${slug}`}
                  className="flex-shrink-0 w-[280px] bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden snap-start inline-block"
                >
                  {/* Image */}
                  <div className="relative w-full h-[200px] flex items-center justify-center bg-gray-50">
                    <Image
                      src={`${IMG_BASE}${item.image}`}
                      alt={item.description}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 pb-6">
                    <h3 className="font-semibold text-gray-900 text-lg truncate">
                      {item.description}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories + Banner After Every 4 Items */}
      <div>
        {categories.map((cat, index) => (
          <div key={`cat-${cat.id}-${index}`}>
            <div className="flex flex-col items-center">
              <SingleService
                id={cat.id}
                categoryName={cat.name}
                subcategoryId={cat?.subcategories?.[0]?.id ?? null}
              />
            </div>

            {/* Banner image after every 4 categories */}
            {(index + 1) % 4 === 0 && (
              <div className="relative w-full h-[180px] my-6 overflow-hidden rounded-xl">
                <Image
                  alt="Banner Image"
                  src="/your-banner-image.jpg"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
