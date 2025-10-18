'use client';

import Image from "next/image";
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity } from '../../../src/store/cartSlice';
import toast, { Toaster } from 'react-hot-toast';
import PainterSidebar from '../sidebar/PainterSidebar';

const painterServices = [
  // Unfurnished Full Home
  { id: 5, title: "Interior Wall Painting", category: "Unfurnished Full Home", price: 799, imgSrc: "/painter/wall-painting.jpg", description: "Painting while protecting your furniture." },
  { id: 1, title: "Unfurnished 1 BHK", category: "Unfurnished Full Home", price: 899, imgSrc: "/painter/wall-highlighter.jpg", description: "Wall painting for unfurnished 1 BHK." },
  { id: 2, title: "Unfurnished 2 BHK", category: "Unfurnished Full Home", price: 799, imgSrc: "/painter/highlight.jpeg", description: "Complete paint for 2 BHK homes." },
  { id: 3, title: "Unfurnished 3 BHK", category: "Unfurnished Full Home", price: 1499, imgSrc: "/painter/2bhk-unfubised.webp", description: "Painting service for large unfurnished homes." },

  // Furnished Full Home
  { id: 4, title: "Walls Painting", category: "Furnished Full Home", price: 899, imgSrc: "/painter/painter-home.jpg", description: "Safe painting for furnished 1 BHKs." },
  
  { id: 6, title: "Furnished 1 BHK", category: "Furnished Full Home", price: 899, imgSrc: "/painter/rom-funished.jpeg", description: "Safe painting for furnished 1 BHKs." },
  { id: 7, title: "Furnished 2 BHK", category: "Furnished Full Home", price: 799, imgSrc: "/painter/2bhk-funished.jpg", description: "Painting while protecting your furniture." },
  { id: 8, title: "Furnished 3 BHK", category: "Furnished Full Home", price: 899, imgSrc: "/painter/3bhk-furnished.jpg", description: "Complete painting for furnished homes." },
  { id: 9, title: "Terrace Waterproofing Paint", category: "Furnished Full Home", price: 899, imgSrc: "/painter/painting.jpg", description: "Complete painting for furnished homes." },
  { id: 5, title: "Interior Wall Painting", category: "Furnished Full Home", price: 799, imgSrc: "/painter/Textured-Paint-Designs.webp", description: "Painting while protecting your furniture." },

  // Kitchen, Bathroom & Balcony
  { id: 10, title: "Kitchen Repainting", category: "Kitchen, Bathroom & Balcony", price: 899, imgSrc: "/painter/kitchen.jpg", description: "Moisture-resistant kitchen wall repainting." },
  { id: 11, title: "Stain Resistant Kitchen Paint", category: "Kitchen, Bathroom & Balcony", price: 899, imgSrc: "/painter/stain-resistant.avif", description: "Long-lasting kitchen wall paint." },
  { id: 12, title: "Anti-Fungal Ceiling Paint", category: "Kitchen, Bathroom & Balcony", price: 499, imgSrc: "/painter/anti-fungal-celling.jpg", description: "Protect ceilings from fungal stains." },
  { id: 13, title: "Bathroom Door Painting", category: "Kitchen, Bathroom & Balcony", price: 1199, imgSrc: "/painter/bathroom-door.webp", description: "Water-resistant door paint." },
  { id: 14, title: "Balcony Wall Paint", category: "Kitchen, Bathroom & Balcony", price: 499, imgSrc: "/painter/balcony.jpg", description: "Exterior-safe balcony wall painting." },
  { id: 15, title: "Balcony Door Paint", category: "Kitchen, Bathroom & Balcony", price: 1199, imgSrc: "/painter/balcony1.jpg", description: "Paint for balcony doors & frames." },
  { id: 16, title: "Balcony Texture Painting", category: "Kitchen, Bathroom & Balcony", price: 499, imgSrc: "/painter/texture.webp", description: "Textured paint for outdoor walls." },
];


const groupByCategory = (services) =>
  services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

export default function PainterPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [quantities, setQuantities] = useState({});

  const allServices = useMemo(() => groupByCategory(painterServices), []);
  const sectionRefs = Object.keys(allServices).reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {});

  const handleScrollTo = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdd = (service) => {
    dispatch(addToCart({ ...service, quantity: 1 }));
    setQuantities((prev) => ({ ...prev, [service.id]: 1 }));
    toast.success("Item added to cart");
  };

  const handleIncrement = (service) => {
    dispatch(addToCart({ ...service, quantity: 1 }));
    setQuantities((prev) => ({
      ...prev,
      [service.id]: (prev[service.id] || 1) + 1,
    }));
  };

  const handleDecrement = (service) => {
    const currentQty = quantities[service.id] || 0;
    if (currentQty > 1) {
      dispatch(decrementQuantity(service));
      setQuantities((prev) => ({ ...prev, [service.id]: currentQty - 1 }));
    } else {
      dispatch(decrementQuantity(service));
      setQuantities((prev) => {
        const updated = { ...prev };
        delete updated[service.id];
        return updated;
      });
    }
  };

 const renderCard = (service) => (
  <div
    key={service.id}
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between w-full max-h-[180px] sm:max-h-[260px] p-4 sm:p-4 gap-4"
  >
    {/* Left Content */}
    <div className="flex flex-col justify-between flex-1 text-[11px] sm:text-sm overflow-hidden h-full">
      <div>
        <h3 className="font-semibold text-gray-900 truncate sm:text-base text-[15px]">
          {service.title}
        </h3>

        <div className="flex items-center gap-1 text-gray-600 mt-[2px] text-[13px] sm:text-sm">
          <span className="text-yellow-500">★</span>
          <span className="text-yellow-600 font-medium">4.81</span>
          <span className="text-gray-400">(14K reviews)</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 font-medium mt-[2px]">
          <span className="text-black font-semibold">₹{service.price}</span>
          <span className="text-gray-500">• {service.duration}</span>
        </div>
      </div>

      {/* View Details */}
      <div className="mt-1">
        <button className="text-purple-600 text-[12px] sm:text-sm hover:underline">
          View details
        </button>
      </div>

      {/* Book Now or Quantity Controls */}
      <div className="mt-1">
        {quantities[service.id] ? (
          <div className="flex items-center border border-purple-600 rounded px-2 py-0.5 w-max">
            <button
              onClick={() => handleDecrement(service)}
              className="text-purple-600 px-1"
            >
              -
            </button>
            <span className="text-xs px-1">{quantities[service.id]}</span>
            <button
              onClick={() => handleIncrement(service)}
              className="text-purple-600 px-1"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAdd(service)}
            className="text-purple-600 border border-purple-600 rounded px-3 py-1 text-[11px] sm:text-sm w-max"
          >
            book now
          </button>
        )}
      </div>
    </div>

    {/* Right Image */}
    <div className="w-32 sm:w-38 h-[120px] sm:h-[130px] rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
      <Image
        src={service.imgSrc}
        alt={service.title}
        width={300}
        height={200}
        quality={100}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

  return (
    <div className="relative min-h-screen pb-20 bg-gray-50">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 md:fixed top-[64px] bottom-0 bg-white z-40 overflow-y-auto shadow-sm">
          <PainterSidebar onScrollTo={handleScrollTo} />
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 md:ml-64 space-y-10">
          {Object.entries(allServices).map(([category, list]) => (
            <section key={category} ref={sectionRefs[category]} id={category}>
              <h2 className="text-xl font-bold mb-4 text-gray-800">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map(renderCard)}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* Mobile Cart Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 z-50 md:hidden flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-700">
              {cartItems.length} item{cartItems.length > 1 ? "s" : ""} selected
            </p>
            <p className="text-lg font-bold text-green-600">₹{totalPrice}</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}