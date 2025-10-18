"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReviewStats from "../components/review/ReviewStats";
import ReviewList from "../components/review/ReviewList";
import carpenterServicesData from "../components/data/carpenterServicesData";
const CheckoutPage = dynamic(() => import("../components/checkout/page"), { ssr: false });
const RelatedServicesPage = dynamic(() => import("../components/realetedservices/page"), { ssr: false });

export default function ServiceDetailsPage() {
  // Reviews state for ReviewList
  const [reviews, setReviews] = useState([
    {
      name: "Alexander Rity",
      time: "4 months ago",
      rating: 5.0,
      text: "Easy booking, great value! Cozy rooms at a reasonable price in Sheffield's vibrant center. Surprisingly quiet with nearby Traveller's accommodations. Highly recommended!",
      images: [
        "/images/review1.jpg",
        "/images/review2.jpg",
        "/images/review3.jpg",
        "/images/review4.jpg",
      ],
    },
    {
      name: "Emma Creight",
      time: "4 months ago",
      rating: 4.0,
      text: "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield's nightlife hub. Surrounded by elegant housing, it's a peaceful gem. Thumbs up!",
      images: [],
    },
  ]);
  const { slug } = useParams();
  const details = carpenterServicesData[slug] || {
    title: "Carpenter Service",
    image: "/images/almari1.avif",
  };

  // State for selected add-ons
  const [selectedAddOns, setSelectedAddOns] = React.useState([]);

  // Example add-ons for related services (should match related services)
  const relatedAddOns = [
    { key: 'carpet', label: 'Carpet Cleaning', price: 499 },
    { key: 'window', label: 'Window Cleaning', price: 399 },
    { key: 'upholstery', label: 'Upholstery Cleaning', price: 299 },
  ];

  // Base price from details (safe fallback)
  const basePrice = details && details.price ? details.price : 3199;

  // Calculate total
  const total = basePrice + selectedAddOns.reduce((sum, key) => {
    const found = relatedAddOns.find(a => a.key === key);
    return sum + (found ? found.price : 0);
  }, 0);

  // Toggle add-on
  const toggleAddOn = (key) => {
    setSelectedAddOns(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  // Tab state
  const [tab, setTab] = React.useState("overview");

  // Payment method state
  const [paymentMethod, setPaymentMethod] = React.useState("upi");
  // Modal state for PriceSummary
  const [showPriceSummary, setShowPriceSummary] = useState(false);

  // Router for navigation
  const router = useRouter();

  // Modal state for address selection
  const [showAddressModal, setShowAddressModal] = useState(false);
  // Modal state for slot selection
  const [showSlotModal, setShowSlotModal] = useState(false);
  // Selected slot state
  const [selectedSlot, setSelectedSlot] = useState(null);


  return (
    <div className="w-full bg-[#f7f8fa] min-h-screen p-3 mt-8">
      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left: Main Card UI */}
        <div className="flex-1">
          {/* Main Large Image Only (no white bg) */}
          <div className="w-full h-[160px] md:h-[260px] relative rounded-2xl overflow-hidden">
            <Image
              src={details.image}
              alt={details.title || "Cleaning Service Image"}
              fill
              className="object-cover"
              style={{ borderRadius: '1rem' }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">{details.title}</span>
            </div>
          </div>
          {/* Space below image */}
          <div className="h-5" />

          {/* Home Deep Cleaning Info Card UI */}
          <div className="rounded-2xl p-6 mb-4">
            <div className="text-lg md:text-lg font-bold text-gray-900 mb-4">What's Included</div>
            <ul className="mb-5 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-green-600 text-lg">✔</span><span className="text-gray-800">Complete top-to-bottom cleaning of all rooms</span></li>
              <li className="flex items-start gap-2"><span className="text-green-600 text-lg">✔</span><span className="text-gray-800">Kitchen & bathroom degreasing and sanitization</span></li>
              <li className="flex items-start gap-2"><span className="text-green-600 text-lg">✔</span><span className="text-gray-800">Dust removal from walls, windows, furniture & fixtures</span></li>
              <li className="flex items-start gap-2"><span className="text-green-600 text-lg">✔</span><span className="text-gray-800">Vacuuming & mopping with industry-grade equipment</span></li>
              <li className="flex items-start gap-2"><span className="text-green-600 text-lg">✔</span><span className="text-gray-800">Use of non-toxic, child & pet-safe chemicals</span></li>
            </ul>
            <div className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span>🛎️</span>Service Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800 text-base text-sm">
              <div className="flex items-center gap-2"><span>⏱️</span><span className="font-semibold">Duration:</span> 4-5 hours</div>
              <div className="flex items-center gap-2"><span>👥</span><span className="font-semibold">Team Size:</span> 2-3 trained cleaning professionals</div>
              <div className="flex items-center gap-2"><span>🧰</span><span className="font-semibold">Equipment:</span> Carried by professional</div>
              <div className="flex items-center gap-2"><span>📦</span><span className="font-semibold">Supplies:</span> Included</div>
            </div>
          </div>
          {/* Review Stats UI below service details */}
          <ReviewStats onSubmitReview={(review) => setReviews(prev => [{ ...review, time: "just now", name: "You" }, ...prev])} />
          <ReviewList reviewList={reviews} />
      
       
      
          
        </div>
        {/* Right: Add Related Services */}
        <div className="w-full lg:w-[420px] flex-shrink-0">
            <RelatedServicesPage
              relatedAddOns={relatedAddOns}
              selectedAddOns={selectedAddOns}
              toggleAddOn={toggleAddOn}
            />
          
          <div className="mt-4">
            <CheckoutPage
              basePrice={basePrice}
              relatedAddOns={relatedAddOns}
              selectedAddOns={selectedAddOns}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              onAddOnToggle={toggleAddOn}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          </div>
        </div>
      </div>

     
    </div>
  );
}
