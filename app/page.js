"use client";

import HeroSection from "./components/Herosection";
import { fetchAllCategories } from "../src/lib/api/api";
import { useEffect, useState } from "react";
import SingleService from "./card/SingleService/page";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <img
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
