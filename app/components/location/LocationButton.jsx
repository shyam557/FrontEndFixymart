"use client";

import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import LocationModal from "./LocationModal";
import { useLocation } from "./LocationContext"; // ⬅️ import context

export default function LocationButton() {
  const [showModal, setShowModal] = useState(false);
  const { location } = useLocation(); // ⬅️ use context value

  return (
    <>
      {/* Top Location Bar */}
      <div className="flex items-center gap-2 p-4 sticky top-0 z-50 bg-transparent">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
          aria-label="Select Location"
        >
          <FaMapMarkerAlt className="text-blue-600 text-lg" />
          <span>
            {location ? (
              <span className="font-semibold">{location}</span>
            ) : (
              <span className="italic text-gray-500">Select Location</span>
            )}
          </span>
        </button>
      </div>

      {/* Location Modal */}
      {showModal && <LocationModal onClose={() => setShowModal(false)} />}
    </>
  );
}
