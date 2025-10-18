'use client';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity } from '../../../src/store/cartSlice';
import { useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import CarpenterSidebar from '../sidebar/CarpenterSidebar';

const carpenterServices = [
   // Door Services
  { id: 1, title: 'Door Installation (Wooden)', category: 'Door', price: 499, imgSrc: '/carpenter/door2.webp', description: 'Install wooden doors with expert fittings.' },
  { id: 2, title: 'Main Door Polishing', category: 'Door', price: 799, imgSrc: '/carpenter/door-polish.webp', description: 'Polish and finish main wooden doors.' },
  { id: 3, title: 'Door Lock Installation', category: 'Door', price: 599, imgSrc: '/carpenter/door-lock1.jpg', description: 'Install or replace door locks securely.' },
  { id: 4, title: 'Door Handle Installation', category: 'Door', price: 2499, imgSrc: '/carpenter/door-hinges.jpg', description: 'Fit handles to new or old doors.' },
  { id: 5, title: 'Door Hinges Replacement', category: 'Door', price: 3999, imgSrc: '/carpenter/door-moder.jpg', description: 'Replace faulty or noisy door hinges.' },
  { id: 6, title: 'Door Stopper Installation', category: 'Door', price: 3999, imgSrc: '/carpenter/door-stopper.png', description: 'Install magnetic or rubber door stoppers.' },
    
  // cupboard & drawer services
  { id: 7, title: 'Cupboard Hinge Repair', category: 'Cupboard & drawer', price: 2999, imgSrc: '/carpenter/cupboard.webp', description: 'Fix broken or loose cupboard hinges.' },
  { id: 8, title: 'Drawer Channel Replacement', category: 'Cupboard & drawer', price: 2999, imgSrc: '/carpenter/channel.webp', description: 'Replace damaged drawer sliding channels.' },
  { id: 9, title: 'Sliding Wardrobe Installation', category: 'Cupboard & drawer', price: 2999, imgSrc: '/carpenter/sliding.webp', description: 'Install sliding wardrobes with precision.' },
  { id: 10, title: 'Handle/Fittings Replacement', category: 'Cupboard & drawer', price: 2999, imgSrc: '/carpenter/Handle.jpg', description: 'Replace cupboard and drawer handles.' },
  { id: 11, title: 'Cupboard Lock Installation', category: 'Cupboard & drawer', price: 2999, imgSrc: '/carpenter/lock.webp', description: 'Install locks for wardrobes and cabinets.' },
  { id: 12, title: 'Cabinet Classic Installation', category: 'Cupboard & drawer', price: 2999, imgSrc: '/carpenter/cupboard1.webp', description: 'Fit classic style cabinets in any space.' },


  // Furniture repair Services
  { id: 13, title: 'Chair Repair', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/chair.jpeg', description: 'Fix broken chair legs or backrests.' },
  { id: 14, title: 'Custom Table Making', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/table.webp', description: 'Get a custom-designed wooden table.' },
  { id: 15, title: 'Wooden Joint Fixing', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/wooden-joint.webp', description: 'Repair loose or broken wooden joints.' },
  { id: 16, title: 'Bookshelf Panel Fixing', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/Bookshelf.jpg', description: 'Fix shelves and panels in bookcases.' },
  { id: 17, title: 'Dining Table Repair', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/dining1.jpg', description: 'Fix shaky or damaged dining tables.' },
  { id: 18, title: 'Custom TV Frame', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/tv-frame1.webp', description: 'Design and install TV wall frames.' },
  { id: 19, title: 'Modular Custom TV Frame', category: 'Furniture Repair', price: 2999, imgSrc: '/carpenter/tv1.webp', description: 'Install modular wooden TV units.' },

//Bed & Sofa Services
  { id: 20, title: 'Custom Bed Making', category: 'Bed & Sofa', price: 699, imgSrc: '/carpenter/bad.avif', description: 'Build beds with custom size and design.' },
  { id: 21, title: 'Hydraulic Bed Installation', category: 'Bed & Sofa', price: 499, imgSrc: '/carpenter/hydraulic-bed.webp', description: 'Install beds with hydraulic lift mechanism.' },
  { id: 22, title: 'Wooden Cot Polishing', category: 'Bed & Sofa', price: 399, imgSrc: '/carpenter/bed-polish.jpg', description: 'Polish old wooden cots for a new look.' },
  { id: 23, title: 'Custom Sofa Making', category: 'Bed & Sofa', price: 799, imgSrc: '/carpenter/sofa.jpeg', description: 'Design and make sofas as per need.' },
  { id: 24, title: 'Sofa Recliner Repair', category: 'Bed & Sofa', price: 799, imgSrc: '/carpenter/sofa3.jpg', description: 'Repair sofa recliner parts and springs.' },
];


const groupByCategory = (services) =>
  services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

export default function CarpenterPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [quantities, setQuantities] = useState({});
  const groupedServices = useMemo(() => groupByCategory(carpenterServices), []);

  const sectionRefs = Object.keys(groupedServices).reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {});

  const handleScrollTo = (category) => {
    sectionRefs[category]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAdd = (service) => {
    dispatch(addToCart({ ...service, quantity: 1 }));
    setQuantities((prev) => ({ ...prev, [service.id]: 1 }));
    toast.success('Item added to cart');
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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderCard = (service) => (
    <div
      key={service.id}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between w-full max-h-[180px] sm:max-h-[260px] p-4 gap-4"
    >
      {/* Left Content */}
      <div className="flex flex-col justify-between flex-1 text-[11px] sm:text-sm overflow-hidden h-full">
        <div>
          <h3 className="font-semibold text-gray-900 truncate sm:text-base text-[15px]">
            {service.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 mt-[2px] text-[13px] sm:text-sm">
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-600 font-medium">4.82</span>
            <span className="text-gray-400">(1.1K reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium mt-[2px]">
            <span className="text-black font-semibold">₹{service.price}</span>
            <span className="text-gray-500">• 45 mins</span>
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
      <div className="w-32 sm:w-36 h-[120px] sm:h-[130px] rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
        <Image
          src={service.imgSrc}
          alt={service.title}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen pb-20 bg-gray-50">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:fixed top-[64px] bottom-0 bg-white z-40 overflow-y-auto shadow-sm">
          <CarpenterSidebar onScrollTo={handleScrollTo} />
        </aside>

        <main className="flex-1 p-4 md:p-6 md:ml-64 space-y-10">
          {Object.entries(groupedServices).map(([category, list]) => (
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
              {cartItems.length} item{cartItems.length > 1 ? 's' : ''} selected
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