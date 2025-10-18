'use client';


import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../../../src/store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../sidebar/ElectricianSidebar";

const electricianServices = [
  // switch and socket services
  { id: 1, title: 'Switch & Socket Installation', category: 'SwitchSocket', price: 120, imgSrc: '/electrician/switch-scket1.webp', description: 'Professional installation of switches and sockets.' },
  { id: 2, title: 'Power Socket Installation (15A)', category: 'SwitchSocket', price: 130, imgSrc: '/electrician/ac-switch.jpg', description: 'Install high-power 15A sockets for heavy appliances.' },
  { id: 3, title: 'Modular Switch Installation', category: 'SwitchSocket', price: 149, imgSrc: '/electrician/board1.webp', description: 'Install modern modular switches with safety.' },
  { id: 4, title: 'Multi-plug Board Installation', category: 'SwitchSocket', price: 149, imgSrc: '/electrician/board.webp', description: 'Setup multi-plug switchboards for multiple devices.' },
  { id: 5, title: 'Smart Appliance Controller Setup', category: 'SwitchSocket', price: 149, imgSrc: '/electrician/smart-switch1.avif', description: 'Install smart switch panels for remote appliance control.' },
  { id: 6, title: 'Switchboard Replacement', category: 'SwitchSocket', price: 149, imgSrc: '/electrician/switch-socket1.webp', description: 'Replace old or damaged switchboards safely.' },


  // Fan services
  { id: 7, title: 'Ceiling Fan Installation', category: 'Fan', price: 399, imgSrc: '/electrician/fan.webp', description: 'Secure and efficient ceiling fan installation.' },
  { id: 8, title: 'Fan Regulator Repair/Replacement', category: 'Fan', price: 349, imgSrc: '/electrician/fan-regulator1.webp', description: 'Fix or replace faulty fan speed regulators.' },
  { id: 9, title: 'Ceiling Fan Repair', category: 'Fan', price: 249, imgSrc: '/electrician/fan-repair.jpeg', description: 'Fix noisy or non-functional ceiling fans.' },
  { id: 10, title: 'Fan Uninstallation (Ceiling/Exhaust/Wall)', category: 'Fan', price: 349, imgSrc: '/electrician/Fan1.webp', description: 'Safe removal of all types of fans.' },
  { id: 11, title: 'Wall Fan Installation', category: 'Fan', price: 349, imgSrc: '/electrician/fan1.webp', description: 'Install wall-mounted fans in any room.' },

  // Wall and celling light services
  { id: 12, title: 'Bulb/Tube Light Holder Installation', category: 'WallCeilingLight', price: 199, imgSrc: '/electrician/bulb-holder.webp', description: 'Install or replace holders for bulbs and tubelights.' },
  { id: 13, title: 'CFL/LED Light Installation', category: 'WallCeilingLight', price: 299, imgSrc: '/electrician/led1.webp', description: 'Install energy-efficient CFL or LED lighting.' },
  { id: 14, title: 'Tube Light Repair/Installation', category: 'WallCeilingLight', price: 149, imgSrc: '/electrician/Tub-light-Installation-Repair.png', description: 'Repair or replace faulty tube lights.' },
  { id: 15, title: 'Ceiling Light Installation', category: 'WallCeilingLight', price: 499, imgSrc: '/electrician/celling-light.jpeg', description: 'Install ceiling-mounted lighting fixtures.' },
  { id: 16, title: 'Chandelier Installation', category: 'WallCeilingLight', price: 999, imgSrc: '/electrician/chanderlier.webp', description: 'Install decorative chandeliers securely.' },

  // wiring services
  { id: 17, title: 'New External Wiring (per 5m)', category: 'Wiring', price: 399, imgSrc: '/electrician/wiring.jpeg', description: 'Install external wiring safely for new connections or extensions.' },
  { id: 18, title: 'Decorative Light Installation (per 6m)', category: 'Wiring', price: 999, imgSrc: '/electrician/jhallaer1.avif', description: 'Install decorative lighting for ceilings, balconies, and walls.' },
  { id: 19, title: 'Decorative Light Uninstallation (per 5m)', category: 'Wiring', price: 999, imgSrc: '/electrician/jhallar.jpeg', description: 'Safely remove decorative lights from walls or ceilings.' },

  // Appliance Services
  { id: 20, title: 'Geyser Installation', category: 'Appliance', price: 499, imgSrc: '/electrician/geyser.webp', description: 'Install electric water geysers with secure fittings and wiring.' },
  { id: 21, title: 'Wi-Fi CCTV Installation', category: 'Appliance', price: 499, imgSrc: '/electrician/cctv1.jpg', description: 'Install wireless CCTV cameras with app integration.' },
  { id: 22, title: 'TV Installation (Wall Mount)', category: 'Appliance', price: 499, imgSrc: '/electrician/tv.jpg', description: 'Wall-mount LED/LCD TVs with secure brackets and alignment.' },
  { id: 23, title: 'TV Uninstallation', category: 'Appliance', price: 499, imgSrc: '/electrician/tv.jpg', description: 'Safely uninstall mounted TVs without damage.' },
  { id: 24, title: 'Mixer Grinder Repair', category: 'Appliance', price: 499, imgSrc: '/electrician/grinder.avif', description: 'Fix issues with non-functional or damaged mixer grinders.' },
  { id: 25, title: 'Washing Machine Installation', category: 'Appliance', price: 499, imgSrc: '/electrician/washingmachine.avif', description: 'Install semi-automatic or fully automatic washing machines.' },


  // doorbell services
  { id: 26, title: 'Doorbell Repair', category: 'Doorbell', price: 129, imgSrc: '/electrician/dorebell.webp', description: 'Repair non-working or damaged doorbell systems.' },
  { id: 27, title: 'Doorbell Installation', category: 'Doorbell', price: 129, imgSrc: '/electrician/dorebell1.webp', description: 'Install wired or wireless doorbell systems at your entrance.' },

  // MCB and Submeter services
  { id: 28, title: 'Single-Pole MCB Installation', category: 'MCBSubmeter', price: 299, imgSrc: '/electrician/mcb5.webp', description: 'Install single-pole MCBs for circuit protection in homes.' },
  { id: 29, title: 'Double-Pole MCB Installation', category: 'MCBSubmeter', price: 499, imgSrc: '/electrician/mcb-2.webp', description: 'Install double-pole MCBs for enhanced electrical safety.' },
  { id: 30, title: 'MCB/Fuse Replacement', category: 'MCBSubmeter', price: 499, imgSrc: '/electrician/mcb.webp', description: 'Replace blown fuses or faulty MCBs in your power panel.' },

  // Inverter and Stabiliser services
  { id: 31, title: 'Inverter Installation', category: 'InverterStabiliser', price: 799, imgSrc: '/electrician/invetor1.webp', description: 'Install home inverters with proper power backup configuration.' },
  { id: 32, title: 'Stabilizer Installation', category: 'InverterStabiliser', price: 399, imgSrc: '/electrician/inveter.png', description: 'Install voltage stabilizers to protect appliances from surges.' },
  { id: 33, title: 'Inverter Repair', category: 'InverterStabiliser', price: 699, imgSrc: '/electrician/inveter-fuse.webp', description: 'Diagnose and repair malfunctioning inverters and batteries.' },

];

const groupByCategory = (services) =>
  services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

export default function ElectricianPage() {
  const dispatch = useDispatch();
  const allServices = useMemo(() => groupByCategory(electricianServices), []);
  const cartItems = useSelector((state) => state.cart.items);
  const [quantities, setQuantities] = useState({});
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const sectionRefs = {
    SwitchSocket: useRef(null),
    Fan: useRef(null),
    WallCeilingLight: useRef(null),
    Wiring: useRef(null),
    Doorbell: useRef(null),
    MCBSubmeter: useRef(null),
    InverterStabiliser: useRef(null),
    Appliance: useRef(null),
  };

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
      <div className="flex flex-col justify-between flex-1 text-[11px] sm:text-sm overflow-hidden h-full">
        <div>
          <h3 className="font-semibold text-gray-900 truncate sm:text-base text-[15px] ">
            {service.title}
          </h3>

          <div className="flex items-center gap-1 text-gray-600 mt-[2px] text-[13px] sm:text-sm">
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-600 font-medium">4.81</span>
            <span className="text-gray-400">(12K reviews)</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 font-medium mt-[2px]">
            <span className="text-black font-semibold">₹{service.price}</span>
            <span className="text-gray-500">• {service.duration || "45 mins"}</span>
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
          <Sidebar onScrollTo={handleScrollTo} />
        </aside>

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