"use client";

import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LocationModal({ onClose }) {
  const { updateLocation } = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleUseCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        const city =
          data?.address?.city ||
          data?.address?.town ||
          data?.address?.village ||
          data?.address?.state ||
          "Unknown";

        updateLocation(city);
        setLoading(false);
        onClose();
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLoading(false);
        alert("Location permission denied.");
      }
    );
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        fetchSuggestions(searchTerm);
      }, 400)
    );
  }, [searchTerm]);

  const recentLocations = ["Aligarh"];
  const filteredRecent = recentLocations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center">
      <div className="w-full md:w-[400px] max-h-[90vh] bg-white rounded-t-2xl md:rounded-lg shadow-lg flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-gray-500">
          <h2 className="text-base font-semibold text-gray-800">
            Select your location
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-600 hover:text-black"
          >
            &times;
          </button>
        </div>

        {/* Search and Suggestions */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 py-4">
          <input
            type="text"
            placeholder="Search for your city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded text-sm mb-4"
          />

          {searchTerm && suggestions.length > 0 && (
            <div className="space-y-2 mb-4">
              {suggestions.map((sug) => (
                <button
                  key={sug.place_id}
                  onClick={() => {
                    updateLocation(sug.display_name);
                    onClose();
                  }}
                  className="w-full bg-gray-50 hover:bg-gray-100 rounded px-4 py-2 text-left text-sm"
                >
                  {sug.display_name}
                </button>
              ))}
            </div>
          )}

          {!searchTerm && (
            <>
              <p className="text-sm font-medium text-gray-500 mb-2">
                Recent Locations
              </p>
              <div className="space-y-2">
                {filteredRecent.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      updateLocation(loc);
                      onClose();
                    }}
                    className="w-full rounded px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sticky Button */}
        <div className="border-t p-4">
          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center justify-center w-full bg-black text-white text-sm py-2 rounded hover:bg-gray-900"
          >
            <FaMapMarkerAlt className="mr-2 text-white" />
            {loading ? "Detecting location..." : "Use Current Location"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
