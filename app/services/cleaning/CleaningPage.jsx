"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../../../src/store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import CleaningSidebar from "../sidebar/CleaningSidebar";
import { useSearchParams } from "next/navigation";

const cleaningServices = [
  { id: 1, title: "Bathroom Deep Cleaning", category: "Bathroom Cleaning", price: 499, duration: "60 mins", imgSrc: "/cleaner/bathroomcleaning.jpeg", description: "Intensive cleaning including stains, taps, walls, and fittings." },
  { id: 2, title: "Toilet Bowl Disinfection", category: "Bathroom Cleaning", price: 799, duration: "45 mins", imgSrc: "/cleaner/englishsheet.jpg", description: "Thorough cleaning of toilet bowl with disinfectant." },
  { id: 3, title: "Tile and Grout Cleaning", category: "Bathroom Cleaning", price: 999, duration: "75 mins", imgSrc: "/cleaner/bathroom-tiles.jpg", description: "Remove mold, soap scum, and hard stains from tiles & grout." },
  { id: 4, title: "Deep Kitchen Cleaning", category: "Kitchen Cleaning", price: 599, duration: "90 mins", imgSrc: "/cleaner/kitchen-cleaning.avif", description: "Degrease walls, tiles, exhaust & shelves." },
  { id: 5, title: "Gas Stove & Chimney Cleaning", category: "Kitchen Cleaning", price: 699, duration: "50 mins", imgSrc: "/cleaner/Kitchen-Cleaning-1.jpg", description: "Remove oil, soot and carbon buildup." },
  { id: 6, title: "Refrigerator Cleaning", category: "Kitchen Cleaning", price: 2499, duration: "30 mins", imgSrc: "/cleaner/Clean-Fridge-Helping-Hands.jpg", description: "Interior & exterior disinfection." },
  { id: 7, title: "Sofa Deep Cleaning", category: "Full Home Cleaning", price: 149, duration: "60 mins", imgSrc: "/cleaner/sofa.jpg", description: "Cushion & fabric steam sanitized." },
  { id: 21, title: "Pest Control Cleaning", category: "Full Home Cleaning", price: 149, duration: "75 mins", imgSrc: "/cleaner/cleaner3.jpg", description: "Pest & insecticide treatment." },
  { id: 8, title: "Home Deep Cleaning", category: "Full Home Cleaning", price: 299, duration: "90 mins", imgSrc: "/cleaner/homecleaning.jpg", description: "1 room, kitchen & bathroom covered." },
  { id: 9, title: "2 BHK Full Deep Cleaning", category: "Full Home Cleaning", price: 199, duration: "120 mins", imgSrc: "/cleaner/2bhk-flat-cleaning.jpeg", description: "Includes fans, windows & floors." },
  { id: 10, title: "3 BHK Full Deep Cleaning", category: "Full Home Cleaning", price: 149, duration: "150 mins", imgSrc: "/cleaner/1bhk-flat.jpg", description: "Top-to-bottom cleaning for large homes." },
  { id: 11, title: "Full Home Cleaning", category: "Full Home Cleaning", price: 149, duration: "60 mins", imgSrc: "/cleaner/Full-house-cleaning-compressed.jpeg", description: "Comprehensive home cleaning." },
  { id: 12, title: "Equipment Sanitization", category: "Gym Cleaning", price: 299, duration: "30 mins", imgSrc: "/cleaner/gym-equipment.webp", description: "Clean and disinfect all machines." },
  { id: 13, title: "Floor Mopping & Gym Cleaning", category: "Gym Cleaning", price: 199, duration: "45 mins", imgSrc: "/cleaner/gym-cleaning.webp", description: "Sanitize mats, floors, and gym space." },
  { id: 14, title: "Mirror & Glass Cleaning", category: "Gym Cleaning", price: 149, duration: "30 mins", imgSrc: "/cleaner/gym-mirror.avif", description: "Polish and streak-free finish for mirrors." },
  { id: 15, title: "Display Area Dusting", category: "Office & Showroom Cleaning", price: 299, duration: "35 mins", imgSrc: "/cleaner/display-dust.webp", description: "Dust removal from racks and displays." },
  { id: 16, title: "Glass & Facade Outside Cleaning", category: "Office & Showroom Cleaning", price: 199, duration: "40 mins", imgSrc: "/cleaner/cleaning.jpeg", description: "Facade and outer glass maintenance." },
  { id: 17, title: "Full Office & Showroom Cleaning", category: "Office & Showroom Cleaning", price: 149, duration: "90 mins", imgSrc: "/cleaner/full-office-showroom.jpg", description: "Deep cleaning of work areas and displays." },
  { id: 18, title: "Termite Control Services", category: "Pest Control", price: 149, duration: "60 mins", imgSrc: "/cleaner/cleaning2.avif", description: "Effective treatment against termite infestations." },
];

const groupByCategory = (services) =>
  services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

export default function CleaningPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [quantities, setQuantities] = useState({});
  const searchParams = useSearchParams();
  const scrollToTitle = searchParams?.get("scrollTo");

  const singleService = scrollToTitle
    ? cleaningServices.find((s) => s.title === scrollToTitle)
    : null;

  const grouped = useMemo(() => groupByCategory(cleaningServices), []);

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
        <h3 className="font-semibold text-gray-900 truncate sm:text-base text-[15px] ">
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
        {!singleService && (
          <aside className="w-full md:w-64 md:fixed top-[64px] bottom-0 bg-white z-40 overflow-y-auto shadow-sm">
            <CleaningSidebar onScrollTo={() => {}} />
          </aside>
        )}

        <main className={`flex-1 p-4 md:p-6 ${!singleService ? "md:ml-64" : ""}`}>
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
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
