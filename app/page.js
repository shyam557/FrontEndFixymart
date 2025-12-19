"use client";

import HeroSection from "./components/Herosection";
import { fetchAllCategories, fetchTopServices } from "../src/lib/api/api";
import { useEffect, useState } from "react";
import SingleService from "./card/SingleService/page";
import Image from "next/image";
import Link from "next/link";

const IMG_BASE = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG;

// ✅ Banner images hosted in /public
const BANNERS = [
  "/banners/banner1.webp",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
  "/banners/banner4.jpg",
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topServices, setTopServices] = useState([]);
  const [topLoading, setTopLoading] = useState(true);

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

      {/* Categories + Auto Banner After Every 4 */}
      <div>
        {categories.map((cat, index) => {
          // ✅ Calculate banner index automatically
          const bannerIndex = Math.floor(index / 4) % BANNERS.length;

          return (
            <div key={`cat-${cat.id}-${index}`}>
              <div className="flex flex-col items-center">
                <SingleService
                  id={cat.id}
                  categoryName={cat.name}
                  subcategoryId={cat?.subcategories?.[0]?.id ?? null}
                />
              </div>

              {/* ✅ Banner after every 4 categories */}
              {(index + 1) % 1 === 0 && (
                <div className="relative w-full h-[180px] my-8 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={BANNERS[bannerIndex]}
                    alt="Category Banner"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
