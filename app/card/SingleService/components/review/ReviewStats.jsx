import React, { useState } from "react";
export default function ReviewStats({ onSubmitReview }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    onSubmitReview({ name, text, rating, images });
    setShowModal(false);
    setName("");
    setText("");
    setRating(5);
    setImages([]);
  };
  return (
    <div className="mb-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Write a Review</button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md" onSubmit={handleSubmit}>
            <div className="font-bold mb-2">Write a Review</div>
            <input className="border rounded p-2 w-full mb-2" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
            <textarea className="border rounded p-2 w-full mb-2" placeholder="Your Review" value={text} onChange={e => setText(e.target.value)} required />
            <div className="mb-2">Rating: <input type="number" min={1} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} className="w-12 border rounded" /></div>
            <div className="mb-2">Images: <input type="file" multiple onChange={e => setImages(Array.from(e.target.files).map(f => URL.createObjectURL(f)))} /></div>
            <div className="flex gap-2 mb-2">
              {images.map((img, i) => <img key={i} src={img} alt="preview" className="w-12 h-12 object-cover rounded" />)}
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            <button type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded ml-2" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
