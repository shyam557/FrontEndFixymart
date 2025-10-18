"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../../../src/store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import PlumberSidebar from "../sidebar/PlumberSidebar";


  
const plumberServices = [
  { id: 1, title: "Bathroom Accessory Installation", category: "Bathroom Fittings", price: 499, duration: "30 mins", imgSrc: "/plumber/bathroom-rank.webp", description: "Install bathroom shelves, holders & more." },
  { id: 2, title: "Towel Rod Installation", category: "Bathroom Fittings", price: 1499, duration: "30 mins", imgSrc: "/plumber/towel.jpg", description: "Mount towel rods securely on bathroom walls." },
  { id: 3, title: "Shower Installation", category: "Bathroom Fittings", price: 499, duration: "35 mins", imgSrc: "/plumber/bathroom-showers.jpg", description: "Install wall-mounted or handheld showers." },
  { id: 4, title: "Bathroom Mirror Installation", category: "Bathroom Fittings", price: 199, duration: "25 mins", imgSrc: "/plumber/bathroom-mirror.webp", description: "Fix mirrors firmly onto bathroom walls." },
  { id: 5, title: "Liquid Soap Tray Installation", category: "Bathroom Fittings", price: 1499, duration: "25 mins", imgSrc: "/plumber/liquid.webp", description: "Install soap trays or dispensers on walls." },

  { id: 6, title: "Tap Repairs", category: "Tap & Mixer", price: 299, duration: "20 mins", imgSrc: "/plumber/tap-fiting.webp", description: "Fix leaking or damaged taps." },
  { id: 7, title: "Water Mixer Tap Repair", category: "Tap & Mixer", price: 1999, duration: "45 mins", imgSrc: "/plumber/water-mixer1.webp", description: "Repair faulty bathroom/kitchen mixers." },
  { id: 8, title: "Tap Installation", category: "Tap & Mixer", price: 299, duration: "20 mins", imgSrc: "/plumber/tap-repair.jpeg", description: "Install new taps in bathrooms or kitchens." },
  { id: 9, title: "Water Mixer Installation", category: "Tap & Mixer", price: 249, duration: "25 mins", imgSrc: "/plumber/tap-repair.avif", description: "Fit new water mixers for showers or sinks." },
  { id: 10, title: "Water Nozzle Installation", category: "Tap & Mixer", price: 399, duration: "20 mins", imgSrc: "/plumber/water-nozzle.jpg", description: "Install nozzles for controlled water flow." },
  { id: 11, title: "Tap Replacement", category: "Tap & Mixer", price: 199, duration: "20 mins", imgSrc: "/plumber/tap-replacement1.jpg", description: "Remove and replace old taps." },

  { id: 12, title: "Toilet Seat Replacement", category: "Toilet", price: 199, duration: "25 mins", imgSrc: "/plumber/toilet-sheet.jpg", description: "Replace broken toilet seats." },
  { id: 13, title: "Western Toilet Installation", category: "Toilet", price: 899, duration: "60 mins", imgSrc: "/plumber/weshtern-toilet1.jpg", description: "Install western-style toilets." },
  { id: 14, title: "Indian Toilet Installation", category: "Toilet", price: 799, duration: "55 mins", imgSrc: "/plumber/indian-toilet.webp", description: "Install Indian-style squat toilets." },
  { id: 15, title: "Toilet Blockage Removal", category: "Toilet", price: 299, duration: "30 mins", imgSrc: "/plumber/toilet-pot1.jpg", description: "Unclog blocked toilets." },
  { id: 16, title: "Flush Tank Repair/Installation", category: "Toilet", price: 399, duration: "35 mins", imgSrc: "/plumber/flush-tank2.webp", description: "Repair or install flush tanks." },
  { id: 17, title: "Toilet Deep Repair", category: "Toilet", price: 499, duration: "60 mins", imgSrc: "/plumber/plumber2.jpg", description: "Fix major toilet issues thoroughly." },
  { id: 18, title: "Jet Spray Installation", category: "Toilet", price: 199, duration: "20 mins", imgSrc: "/plumber/jet.png", description: "Install bidet/jet sprays." },
  { id: 19, title: "Western Toilet Repair", category: "Toilet", price: 349, duration: "45 mins", imgSrc: "/plumber/western-toilet.avif", description: "Fix leaks or flush issues in western toilets." },
  { id: 20, title: "Flush Tank Replacement", category: "Toilet", price: 149, duration: "30 mins", imgSrc: "/plumber/flush-tank1.webp", description: "Replace faulty flush tanks." },

  { id: 21, title: "Sink Installation", category: "Water Tank & Sink Services", price: 399, duration: "40 mins", imgSrc: "/plumber/shink-installation.webp", description: "Install kitchen or bathroom sinks." },
  { id: 22, title: "Wash Basin Installation", category: "Water Tank & Sink Services", price: 899, duration: "45 mins", imgSrc: "/plumber/wash-beshan.webp", description: "Install ceramic or wall-mounted wash basins." },
  { id: 23, title: "Waste Pipe Replacement", category: "Water Tank & Sink Services", price: 1299, duration: "30 mins", imgSrc: "/plumber/waste-pipe.jpg", description: "Replace sink or basin waste pipes." },
  { id: 24, title: "Water Tank Cleaning", category: "Water Tank & Sink Services", price: 599, duration: "50 mins", imgSrc: "/plumber/water-tank.jpg", description: "Clean and disinfect overhead tanks." },
  { id: 25, title: "Water Tank Installation", category: "Water Tank & Sink Services", price: 599, duration: "75 mins", imgSrc: "/plumber/water-tank1.webp", description: "Install overhead water storage tanks." }
];



const groupByCategory = (services) =>
  services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

export default function PlumberPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [quantities, setQuantities] = useState({});
  const grouped = useMemo(() => groupByCategory(plumberServices), []);

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
        <aside className="w-full md:w-64 md:fixed top-[64px] bottom-0 bg-white z-40 overflow-y-auto shadow-sm">
          <PlumberSidebar />
        </aside>

        <main className="flex-1 p-4 md:p-6 md:ml-64">
          {Object.entries(grouped).map(([category, list]) => (
            <section key={category} className="mb-10" id={category}>
              <h2 className="text-xl font-bold mb-4 text-gray-800">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map(renderCard)}
              </div>
            </section>
          ))}
        </main>
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 z-50 md:hidden flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-700">
              {cartItems.length} item{cartItems.length > 1 ? "s" : ""} selected
            </p>
            <p className="text-lg font-bold text-green-600">₹{totalPrice}</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">View Cart</button>
        </div>
      )}
    </div>
  );
}
