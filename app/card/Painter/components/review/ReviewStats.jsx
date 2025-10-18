import React, { useState } from "react";

const defaultReviewData = {
  average: 4.0,
  totalRatings: "35k",
  ratings: [
    { stars: 5, count: 14000 },
    { stars: 4, count: 6000 },
    { stars: 3, count: 4000 },
    { stars: 2, count: 800 },
    { stars: 1, count: 9000 },
  ],
  aspects: [
    { label: "Cleanliness", value: 4.0 },
    { label: "Safety & Security", value: 4.0 },
    { label: "Staff", value: 4.0 },
    { label: "Amenities", value: 3.5 },
    { label: "Location", value: 3.0 },
  ],
};

export default function ReviewStats({ reviewData = defaultReviewData, onSubmitReview }) {
  const maxCount = Math.max(...reviewData.ratings.map(r => r.count));
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [reviewerName, setReviewerName] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleRemoveImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmitReview === "function") {
      onSubmitReview({
        name: reviewerName,
        rating,
        text: reviewText,
        images: images.map(img => URL.createObjectURL(img)),
      });
    }
    setShowModal(false);
    setReviewerName("");
    setReviewText("");
    setRating(0);
    setImages([]);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6 flex flex-col min-h-[495px] justify-between border border-gray-200">
      <h2 className="text-lg font-bold mb-4">Reviews</h2>
      <div className="w-full border-b border-gray-200 mb-2"></div>
      <button
        className="mb-6 px-4 py-2 m-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-bold"
        onClick={() => setShowModal(true)}
      >
        Write a Review
      </button>
      <div className="flex flex-col md:flex-row gap-6 flex-grow ">
        {/* Left: Average rating */}
        <div className="flex flex-col  items-center md:items-start min-w-[120px] mt-4">
          <div className="text-4xl font-bold mt-4">{reviewData.average.toFixed(1)}</div>
          <div className=" flex items-center  gap-1 text-purple-600 text-xl mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(reviewData.average) ? "★" : "☆"}</span>
            ))}
          </div>
          <div className="text-gray-500 text-xs mb-2 mt-1">{reviewData.totalRatings} ratings</div>
        </div>
        {/* Middle: Rating bars */}
        <div className="flex-1 flex flex-col gap-4 justify-center min-w-[260px] md:min-w-[340px]">
          {reviewData.ratings.map(r => (
            <div key={r.stars} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-full">
                <div className="w-full max-w-[220px] md:max-w-[320px] h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${(r.count / maxCount) * 100}%`, background: "#b266ff" }}
                  ></div>
                </div>
                <div className="text-gray-700 text-sm font-semibold w-10 text-right">{r.stars}.0</div>
                <div className="text-gray-400 text-xs w-20 text-right">{r.count >= 1000 ? `${Math.round(r.count/1000)}K` : r.count} reviews</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Aspects */}
      <div className="flex flex-wrap gap-4 mt-8 text-sm">
        {reviewData.aspects.map(a => (
          <div
            key={a.label}
            className={`flex items-center  gap-2 px-5 py-2 rounded-xl font-semibold text-base border shadow-sm ${a.value >= 4 ? 'bg-green-50 text-green-700 border-green-300 text-sm' : 'bg-gray-50 text-gray-700 border-gray-300 text-sm'}`}
            style={{ minWidth: '150px', justifyContent: 'center' }}
          >
            <span className={`font-bold ${a.value >= 4 ? 'text-green-700' : 'text-gray-700'}`}>{a.value}</span>
            <span>{a.label}</span>
          </div>
        ))}
      </div>

      {/* Modal for writing review */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-3xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-semibold">Your Name:</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={32}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Your Rating:</label>
                <div className="flex gap-1 text-2xl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                      onClick={() => setRating(i + 1)}
                    >★</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Your Review:</label>
                <textarea
                  className="w-full border rounded-lg p-2"
                  rows={4}
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Upload Images:</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {/* Preview selected images */}
                {images.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`preview-${idx}`}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-white/80 text-gray-700 rounded-full px-1 py-0 text-xs group-hover:bg-red-500 group-hover:text-white"
                          onClick={() => handleRemoveImage(idx)}
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                disabled={rating === 0 || reviewText.trim() === "" || reviewerName.trim() === ""}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
