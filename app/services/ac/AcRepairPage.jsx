"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../../../src/store/cartSlice";
import { useState, useRef, useMemo } from "react";
import Sidebar from "../sidebar/ACSidebar";
import toast, { Toaster } from "react-hot-toast";

const services = [
  {
    id: 1,
    title: "Foam-jet AC Service",
    description: "Foam cleaning for better airflow and hygiene",
    price: 599,
    duration: "45 mins",
    imgSrc: "/images/ac-foam-jet.webp",
    alt: "Foam-jet",
    category: "Service",
  },
  {
    id: 3,
    title: "Foam-jet AC Service (2 ACs)",
    description: "Foam cleaning for 2 ACs to improve cooling",
    price: 999,
    duration: "60 mins",
    imgSrc: "/ac/air-conditioner-installation-servicewebp",
    alt: "Deep Cleaning",
    category: "Service",
  },
  {
    id: 8,
    title: "Foam-jet AC Service (3 ACs)",
    description: "Foam cleaning for 3 ACs for fresh air and performance",
    price: 649,
    duration: "70 mins",
    imgSrc: "/ac/air-conditioner-installation-servicewebp",
    alt: "Cooling Coil",
    category: "Service",
  },
  {
    id: 2,
    title: "AC Power issue Fix",
    description: "Fix power or startup issues in AC",
    price: 799,
    duration: "40 mins",
    imgSrc: "/ac/ac4.avif",
    alt: "Power Issue",
    category: "Repair & Gas Refill",
  },
  {
    id: 4,
    title: "AC less/no cooling",
    description: "Resolve low cooling due to gas or coil issues",
    price: 299,
    duration: "35 mins",
    imgSrc: "/ac/ac-samsung.webp",
    alt: "Low Cooling",
    category: "Repair & Gas Refill",
  },
  {
    id: 6,
    title: "AC Water leakage Repair",
    description: "Repair AC water leakage from indoor unit",
    price: 499,
    duration: "45 mins",
    imgSrc: "/ac/ac-samsung.webp",
    alt: "Leakage Repair",
    category: "Repair & Gas Refill",
  },
  {
    id: 7,
    title: "Gas Leak Fix",
    description: "Fix gas leak issues quickly",
    price: 699,
    duration: "60 mins",
    imgSrc: "/ac/ac-samsung.webp",
    alt: "Gas Leak",
    category: "Repair & Gas Refill",
  },
  {
    id: 9,
    title: "AC Window Repair",
    description: "Fix window AC cooling or fan issues",
    price: 1299,
    duration: "70 mins",
    imgSrc: "/ac/ac-gas-rifill.jpg",
    alt: "Window Repair",
    category: "Repair & Gas Refill",
  },
  {
    id: 5,
    title: "Split AC Installation",
    description: "Professional split AC installation",
    price: 899,
    duration: "90 mins",
    imgSrc: "/ac/ac-service2.jpg",
    alt: "Split Installation",
    category: "Installation/Uninstallation",
  },
  {
    id: 10,
    title: "Window AC Installation",
    description: "Install your window AC with expert help",
    price: 799,
    duration: "75 mins",
    imgSrc: "/ac/window-ac2.webp",
    alt: "Window AC Install",
    category: "Installation/Uninstallation",
  },
  {
    id: 11,
    title: "Split AC Uninstallation",
    description: "Uninstall split AC safely with care",
    price: 599,
    duration: "50 mins",
    imgSrc: "/ac/ac-service2.jpg",
    alt: "Split Uninstall",
    category: "Installation/Uninstallation",
  },
  {
    id: 12,
    title: "Window AC Uninstallation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/window-ac2.webp",
    alt: "Window AC Uninstall",
    category: "Installation/Uninstallation",
  },


  {
    id: 13,
    title: "Washing Machine Installation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/washing-machinne.webp",
    alt: "Washing-Machine Repair",
    category: "Washing Machine",
  },

   {
    id: 14,
    title: "Washing Machine Uninstallation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/washing-machine1.jpg",
    alt: "Window AC Uninstall",
    category: "Washing Machine",
  },

   {
    id: 15,
    title: "Washing Machine Service",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/washing-machine.jpg",
    alt: "Window AC Uninstall",
    category: "Washing Machine",
  },

  {
    id: 12,
    title: "TV Check-up",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/tv.jpg",
    alt: "Window AC Uninstall",
    category: "Television",
  },

  {
    id: 16,
    title: "TV Installation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/tv-intallation.jpg",
    alt: "Window AC Uninstall",
    category: "Television",
  },

  {
    id: 17,
    title: "TV Uninstallation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/tv-installing-.avif",
    alt: "Window AC Uninstall",
    category: "Television",
  },

  {
    id: 18,
    title: "Geyser Installation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/geyser.webp",
    alt: "Window AC Uninstall",
    category: "Geyser",
  },

  {
    id: 19,
    title: "Geyser Uninstallation",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/geyser2.png",
    alt: "Window AC Uninstall",
    category: "Geyser",
  },

  {
    id: 20,
    title: "Geyser service",
    description: "Uninstall window AC safely",
    price: 499,
    duration: "40 mins",
    imgSrc: "/ac/geyser_installation.jpg",
    alt: "Window AC Uninstall",
    category: "Geyser",
  },

  


];

export default function AcRepairPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [quantities, setQuantities] = useState({});

  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      acc[service.category] = acc[service.category] || [];
      acc[service.category].push(service);
      return acc;
    }, {});
  }, []);

  const sectionRefs = {
    Service: useRef(null),
    "Repair & Gas Refill": useRef(null),
    "Installation/Uninstallation": useRef(null),
    "Washing Machine": useRef(null),
    "Television": useRef(null),
    "Geyser": useRef(null),
    "Air Cooler": useRef(null),
    
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleScrollTo = (category) => {
    sectionRefs[category]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      setQuantities((prev) => ({
        ...prev,
        [service.id]: currentQty - 1,
      }));
    } else {
      dispatch(decrementQuantity(service));
      setQuantities((prev) => {
        const updated = { ...prev };
        delete updated[service.id];
        return updated;
      });
    }
  };

  return (
    <div className="relative min-h-screen pb-24 bg-gray-50">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:fixed top-[64px] bottom-0 bg-white z-40 overflow-y-auto shadow-sm">
          <Sidebar onScrollTo={handleScrollTo} />
        </aside>

        <main className="flex-1 p-4 md:p-6 md:ml-64 space-y-10">
          {Object.entries(groupedServices).map(([category, list]) => (
            <section key={category} id={category} ref={sectionRefs[category]}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((service) => (
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

                      <div className="mt-1">
                        <button className="text-purple-600 text-[12px] sm:text-sm hover:underline">
                          View details
                        </button>
                      </div>

                      <div className="mt-1">
                        {quantities[service.id] ? (
                          <div className="flex items-center border border-purple-600 rounded px-2 py-0.5 w-max">
                            <button
                              onClick={() => handleDecrement(service)}
                              className="text-purple-600 px-1"
                            >
                              -
                            </button>
                            <span className="text-xs px-1">
                              {quantities[service.id]}
                            </span>
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
                        alt={service.alt || service.title}
                        width={300}
                        height={200}
                        quality={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
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
