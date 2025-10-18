import React from "react";

export default function ReviewList({ reviewList }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6 border border-gray-200">
      <h2 className="text-lg font-bold mb-4">Total Reviews</h2>
      <div className="w-full border-b border-gray-200 mb-2"></div>
      {reviewList && reviewList.length > 0 && reviewList.map((r, idx) => (
        <div key={idx} className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">{r.name}</span>
              <span className="text-gray-500 text-xs">{r.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{r.rating.toFixed(1)}</span>
              <span className="text-purple-600 text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(r.rating) ? "★" : "☆"}</span>
                ))}
              </span>
            </div>
          </div>
          <div className="text-gray-800 mb-2 text-sm">{r.text}</div>
          {r.images && r.images.length > 0 && (
            <div className="flex gap-2 mb-2">
              {r.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`review-img-${i}`}
                  className="w-20 h-16 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
          <div className="w-full border-b border-gray-100 mt-4"></div>
        </div>
      ))}
      <div className="mt-2">
        <a href="#" className="text-purple-700 font-bold text-sm hover:underline">Read all reviews <span className="text-lg">▼</span></a>
      </div>
    </div>
  );
}
