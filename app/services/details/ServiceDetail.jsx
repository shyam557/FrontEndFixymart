"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function ServiceDetail({ service, onClose, onAdd, onDone, groupedServices = {} }) {
  const s = service || {};
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState(service?.reviews || []);

  // get cart items from redux so that after user clicks Add, those items appear
  // in the 'Frequently added together' rail (excluding the current service)
  const cartItems = useSelector((state) => state.cart?.items || []);

  // deduplicated cart items (excluding the current service). We'll only show
  // the 'Frequently added together' rail when the user has actually added
  // something to the cart (i.e. this list is non-empty).
  const cartFiltered = useMemo(() => {
    return cartItems
      .filter((ci) => ci && ci.id !== s.id)
      .reduce((acc, ci) => {
        if (!acc.some((a) => a.id === ci.id)) acc.push(ci);
        return acc;
      }, []);
  }, [cartItems, s.id]);

  // build the list to show: if cartFiltered is empty we do NOT show any rail
  // (user asked that suggestions appear only after clicking Add). If cart has
  // items, show cart items first then fill with same-category recommendations.
  const frequentlyAdded = useMemo(() => {
    if (!cartFiltered || cartFiltered.length === 0) return [];

    const other = Object.values(groupedServices)
      .flat()
      .filter((ss) => ss && ss.id !== s.id && !cartFiltered.some((c) => c.id === ss.id));

    return [...cartFiltered, ...other].slice(0, 8);
  }, [cartFiltered, groupedServices, s.id]);

  return (
    <div>
      <div className="flex justify-between items-start p-4 md:p-6 border-b">
        <div>
          <h3 className="text-2xl font-bold">{s.title}</h3>
          <div className="text-sm text-gray-600">{s.category}</div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 w-full h-48 bg-gray-100 rounded overflow-hidden">
            {s.imgSrc ? (
              <Image src={s.imgSrc} alt={s.alt || s.title} width={600} height={400} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold">₹{s.price}</div>
                <div className="text-sm text-gray-600">Duration: {s.duration}</div>
                {s.offer && <div className="text-sm text-green-600 mt-1">{s.offer}</div>}
              </div>
              <div className="space-x-2">
                <button onClick={() => onAdd && onAdd(s)} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                <button onClick={() => onDone && onDone(s)} className="bg-green-600 text-white px-4 py-2 rounded">Done</button>
              </div>
            </div>

            <p className="text-gray-700 mt-4">{s.description}</p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Our Process</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {(s.process || []).map((step, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-sm text-blue-600">Step {idx + 1}</div>
                <div className="text-sm text-gray-700">{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Frequently Asked Questions</h4>
          <div className="space-y-2">
            {(s.faqs || []).map((faq, i) => (
              <details key={i} className="border rounded">
                <summary className="px-4 py-3 cursor-pointer font-medium">{faq.question}</summary>
                <div className="px-4 pb-3 text-sm text-gray-700">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Ratings & Reviews</h4>

          {/* rating summary */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{(s.ratings || (s.reviews && s.reviews.length ? (s.reviews.reduce((acc, r) => acc + (r.rating||0), 0) / s.reviews.length).toFixed(2) : '0'))}</div>
              <div className="text-sm text-gray-500">{(s.reviews || []).length} reviews</div>
            </div>

            <div className="flex-1">
              {/* histogram rows 5..1 */}
              {([5,4,3,2,1]).map((star) => {
                const reviews = s.reviews || [];
                const count = reviews.filter(r => Math.round(r.rating) === star).length;
                const total = reviews.length || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={star} className="flex items-center gap-3 mb-2">
                    <div className="w-8 text-sm">★ {star}</div>
                    <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-2 bg-black"></div>
                    </div>
                    <div className="w-10 text-sm text-gray-600 text-right">{count}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="py-4">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold">All reviews</h5>
              <div className="flex gap-2">
                <button onClick={() => setIsFilterOpen(true)} className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg> 
                  Filter
                </button>
                <button onClick={() => setIsReviewFormOpen(true)} className="text-purple-600 hover:text-purple-700">
                  + Write a review
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 border rounded text-sm">Most detailed</button>
              <button className="px-3 py-1 border rounded text-sm">In my area</button>
              <button className="px-3 py-1 border rounded text-sm">Frequent users</button>
            </div>
          </div>

          {/* Review filter modal */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
              <div className="fixed inset-0 bg-black/40" onClick={() => setIsFilterOpen(false)} />
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Rating</div>
                    {[5,4,3,2,1].map(star => (
                      <label key={star} className="flex items-center gap-2 py-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStars.includes(star)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStars([...selectedStars, star]);
                            } else {
                              setSelectedStars(selectedStars.filter(s => s !== star));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span>★ {star} Star</span>
                      </label>
                    ))}
                  </div>

                  <div className="border-t pt-4 flex justify-end gap-3">
                    <button onClick={() => { setSelectedStars([]); }} className="px-4 py-2 text-sm text-gray-600">Reset</button>
                    <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 text-sm bg-purple-600 text-white rounded">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add review modal */}
          {isReviewFormOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
              <div className="fixed inset-0 bg-black/40" onClick={() => setIsReviewFormOpen(false)} />
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Write a review</h3>
                  <button onClick={() => setIsReviewFormOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Rating</div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Review</div>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience..."
                      className="w-full rounded border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      rows={4}
                    />
                  </div>

                  <div className="border-t pt-4 flex justify-end gap-3">
                    <button onClick={() => setIsReviewFormOpen(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
                    <button
                      onClick={() => {
                        // Add the new review to the list
                        const userReview = {
                          ...newReview,
                          user: "You", // You can replace this with actual user name
                          date: new Date().toISOString()
                        };
                        setReviews([userReview, ...reviews]);
                        setIsReviewFormOpen(false);
                        setNewReview({ rating: 5, comment: "" });
                      }}
                      className="px-4 py-2 text-sm bg-purple-600 text-white rounded"
                      disabled={!newReview.rating || !newReview.comment.trim()}
                    >
                      Post review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {reviews
              .filter(r => selectedStars.length === 0 || selectedStars.includes(Math.round(r.rating)))
              .map((r, idx) => (
                <div key={idx} className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.user}</div>
                      <div className="text-sm text-gray-500">{r.comment}</div>
                    </div>
                    <div className="text-yellow-400">{[...Array(5)].map((_, i) => <span key={i}>{i < r.rating ? '★' : '☆'}</span>)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Frequently added together</h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {frequentlyAdded.map((ss) => (
              <div key={ss.id} className="min-w-[200px] bg-white border rounded p-3 flex-shrink-0">
                <div className="h-28 w-full mb-2 bg-gray-100 rounded overflow-hidden">
                  {ss.imgSrc ? (
                    <Image src={ss.imgSrc} alt={ss.alt || ss.title} width={400} height={260} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>
                <div className="font-medium text-sm">{ss.title}</div>
                <div className="text-sm text-gray-600">₹{ss.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
