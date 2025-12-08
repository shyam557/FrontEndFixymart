"use client";

import HeroSection from "./components/Herosection";
import { fetchAllCategories, fetchTopServices } from "../src/lib/api/api";
import { useEffect, useState } from "react";
import SingleService from "./card/SingleService/page";
import Image from "next/image";
import Link from "next/link";

const IMG_BASE = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG;

const NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG;

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topServices, setTopServices] = useState([]);
  const [topLoading, setTopLoading] = useState(true);

  const [showDialog, setShowDialog] = useState(false);
  const [phone, setPhone] = useState("");

  // IMPORTANT: Put even dummy URL
  const GOOGLE_URL = "https://docs.google.com/spreadsheets/d/1_hlWKH09EsPWzjXaAVG-eAG6YJalrOL0rXTcmOcDC7g/edit?gid=0#gid=0";

  // Fix hydration issues in Next.js
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
        console.log(data);
      } catch (err) {
        console.error('Failed to fetch top services:', err);
        setTopServices([]);
      } finally {
        setTopLoading(false);
      }

      console.log(topServices)
    }
    loadTopServices();
  }, []);

  // Auto popup after hydration + 2 seconds
  // useEffect(() => {
  //   if (!isHydrated) return;

  //   const timer = setTimeout(() => {
  //     setShowDialog(true);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [isHydrated]);

  const sendToGoogleSheet = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      await fetch(GOOGLE_URL, {
        method: "POST",
        body: JSON.stringify({ phone }),
      });

      alert("Saved!");
      setShowDialog(false);
    } catch (err) {
      alert("Error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="relative overflow-visible">
      <HeroSection data={categories} />




{/* Scrollable Cards (Converted to Featured Services Style) */}
  {/* Featured Top Services Carousel */}
      {!topLoading && topServices.length > 0 && (
   
<div className="max-w-7xl mx-auto px-4 py-8 bg-white">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Services</h2>

  <div
    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth snap-x snap-mandatory"
    style={{ WebkitOverflowScrolling: "touch" }}
  >
    {topServices.map((item, index) => {
      const slug = item.description
        .toLowerCase()
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
              // src={item.image}
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


      {/* Your existing layout */}
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

            {(index + 1) % 4 === 0 && (
              <Image
              alt="h"
                src="/your-banner-image.jpg"
                className="w-full h-[180px] object-cover my-6 rounded-xl"
              />
            )}
          </div>
        ))}
      </div>

    </main>
  );
}
