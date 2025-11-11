"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import PriceSummary from "./PriceSummary";
import BookingForm from "./BookingForm";
import SelectAddressModal from "./SelectAddressModal";
import SelectSlotModal from "./SelectSlotModal";
export default function CheckoutPage({ basePrice = 2999, relatedAddOns = [], selectedAddOns = [], selectedSlot, setSelectedSlot }) {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showPriceSummary, setShowPriceSummary] = useState(false);
  const total = basePrice + selectedAddOns.reduce((sum, key) => {
    const found = relatedAddOns.find(a => a.key === key);
    return sum + (found ? found.price : 0);
  }, 0);
  return (
    <div className="bg-white rounded-2xl shadow p-6 border flex flex-col gap-4 ">
      <div className="text-lg font-bold mb-1">Price Summary</div>
      <div className="text-base font-semibold text-gray-900 mb-2 text-sm">Base Price: <span className="font-bold text-sm">₹{basePrice}</span></div>
      {selectedAddOns.length > 0 && (
        <div className="flex flex-col gap-1 text-sm">
          {selectedAddOns.map(key => {
            const addOn = relatedAddOns.find(a => a.key === key);
            return addOn ? (
              <div key={key} className="flex items-center text-base font-semibold text-gray-900 text-sm">
                <span className="mr-2">+</span> {addOn.label}: <span className="font-bold ml-1">₹{addOn.price}</span>
              </div>
            ) : null;
          })}
        </div>
      )}
      <hr className="my-1 border-gray-200" />
      <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4  mb-2 text-sm">
        <div>
          <div className="font-semibold mb-1 ">Address</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold" onClick={() => setShowAddressModal(true)}>
            Select an address
          </button>
          {showAddressModal && (
            <SelectAddressModal onClose={() => setShowAddressModal(false)} />
          )}
        </div>
        <div>
          <div className="font-semibold mb-1">Slot</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold" onClick={() => setShowSlotModal(true)}>
            {selectedSlot ? `${selectedSlot.slot} (${selectedSlot.day})` : 'Select a slot'}
          </button>
          {showSlotModal && (
            <SelectSlotModal onClose={() => setShowSlotModal(false)} onSelect={slot => setSelectedSlot(slot)} />
          )}
        </div>
        <div>
          <div className="font-semibold mb-1">Payment Method</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold" onClick={() => setShowPriceSummary(true)}>
            Select payment method
          </button>
          {showPriceSummary && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="w-full max-w-md mx-auto">
                <PriceSummary total={total} onClose={() => setShowPriceSummary(false)} />
              </div>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-2">Cancellation policy<br/>Free cancellations if done more than 12 hrs before the service or if a professional isn&apos;t assigned. A fee will be charged otherwise.</div>
      </div>
      <hr className="my-1 border-gray-200" />
      <div className="flex items-center justify-between text-lg font-bold mb-2 w-full">
        <span>Total:</span>
        <span>₹{total} <span className="text-green-600 text-lg ml-1">✅</span></span>
      </div>
      <button className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-bold text-md mt-4 transition text-sm">Proceed to Pay</button>
    </div>
  );
}
