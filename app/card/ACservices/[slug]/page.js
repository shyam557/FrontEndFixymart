"use client";
import React, { useState } from "react";
import acServicesData from "../components/data/acServicesData";
import ReviewStats from "../components/review/ReviewStats";
import ReviewList from "../components/review/ReviewList";
import dynamic from "next/dynamic";
const CheckoutPage = dynamic(() => import("../components/checkout/page"), { ssr: false });
const RelatedServicesPage = dynamic(() => import("../components/realetedservices/page"), { ssr: false });
import { useParams } from "next/navigation";

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  // Normalize slug to match keys in acServicesData
  const normalizedSlug = Object.keys(acServicesData).find(key => key === slug || acServicesData[key].title.replace(/\s+/g, '-').toLowerCase() === slug);
  const details = acServicesData[normalizedSlug] || {
    title: "AC Service",
    image: "/images/ac4.avif",
    price: 2999,
  };
  const [reviews, setReviews] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const relatedAddOns = [
    { key: 'ac_cleaning', label: 'AC Cleaning', price: 499 },
    { key: 'ac_repair', label: 'AC Repair', price: 799 },
  ];
  const basePrice = details.price;
  const total = basePrice + selectedAddOns.reduce((sum, key) => {
    const found = relatedAddOns.find(a => a.key === key);
    return sum + (found ? found.price : 0);
  }, 0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  return (
    <div className="w-full bg-[#f7f8fa] min-h-screen p-3 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 mt-8">
        <div className="flex-1">
          <div className="w-full h-[220px] md:h-[320px] relative rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100">
            <img
              src={details.image}
              alt={details.title}
              className="object-contain"
              style={{ width: '60%', height: '80%', maxHeight: '260px', minHeight: '120px', borderRadius: '1rem' }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">{details.title}</span>
            </div>
          </div>
          <div className="h-5" />
          <div className="rounded-2xl p-6 mb-4">
            <div className="text-lg font-bold text-gray-900 mb-4">What's Included</div>
            <ul className="mb-5 space-y-2 text-sm">
              <li>AC cleaning and filter wash</li>
              <li>Gas check and refill (if needed)</li>
              <li>Basic repairs and maintenance</li>
            </ul>
            <div className="text-lg font-bold text-gray-900 mb-3">Service Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800 text-base text-sm">
              <div>Duration: 2-3 hours</div>
              <div>Team Size: 1-2 professionals</div>
              <div>Equipment: Provided</div>
              <div>Supplies: Included</div>
            </div>
          </div>
          <ReviewStats onSubmitReview={review => setReviews(prev => [review, ...prev])} />
          <ReviewList reviewList={reviews} />
        </div>
        <div className="w-full lg:w-[420px] flex-shrink-0">
          <RelatedServicesPage
            relatedAddOns={relatedAddOns}
            selectedAddOns={selectedAddOns}
            toggleAddOn={key => setSelectedAddOns(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])}
          />
          <div className="mt-4">
            <CheckoutPage
              basePrice={basePrice}
              relatedAddOns={relatedAddOns}
              selectedAddOns={selectedAddOns}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
