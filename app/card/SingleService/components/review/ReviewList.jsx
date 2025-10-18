import React from "react";
export default function ReviewList({ reviewList = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border mb-4">
      <div className="font-bold mb-2">AC Service Reviews</div>
      {reviewList.length === 0 ? (
        <div className="text-gray-500">No reviews yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviewList.map((review, idx) => (
            <div key={idx} className="border rounded-lg p-3">
              <div className="font-semibold">{review.name}</div>
              <div className="text-yellow-500">Rating: {review.rating} ⭐</div>
              <div className="text-gray-700 mb-2">{review.text}</div>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="review" className="w-16 h-16 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
