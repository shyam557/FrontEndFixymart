"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementQuantity } from "../../../src/store/cartSlice";
import React, { useState, useRef, useMemo, useEffect } from "react";
import CustomSidebar from "../sidebar/CustomSidebar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { useRouter } from 'next/navigation';
import ServiceModal from "../details/ServiceModal";
import ServiceDetail from "../details/ServiceDetail";

import { fetchOneCategories ,fetchOneSubCategoryServices } from "../../../src/lib/api/api";
// import { useEffect, useState } from 'react';
// import React, { useEffect, useRef, useMemo, useState } from "react";



export default function AcRepairPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [quantities, setQuantities] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



//sideBarSharing List
    const sideBarItems = [
  
  ];

  // 🧩 Fetch all subcategories, then all services
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        setLoading(true);

        const data = await fetchOneCategories("4e4bb50a-3563-435f-bb41-4cb39e89109c");
        const subCategories = data[0].subcategories;
        console.log(data,subCategories);

        //add all sub categories to the SideBarItems

        sideBarItems.push(
            ...subCategories.map((srv) => ({
              label:srv.name,
              key:srv.name

            }))
          );

        console.log("Sidebar Items",sideBarItems);


        // // STEP 1: Get subcategories for a category (change categoryId if needed)
        // const categoryId = 1;
        // const subCatRes = await axios.get(
        //   `https://your-api.com/categories/${categoryId}/subcategories`
        // );
        // const subCategories = subCatRes.data.subcategories;

        // STEP 2: Fetch all services for each subcategory
        const allServices = [];
        for (const sub of subCategories) {
          const serviceRes = await fetchOneSubCategoryServices(sub.id);
          console.log("single service",serviceRes);
          // const serviceRes = await axios.get(
            // `https://your-api.com/subcategories/${sub.id}/services`
          // );
          // Assuming serviceRes.data is an array of service objects
          allServices.push(
            ...serviceRes.map((srv) => ({
              id:srv.id,
              title:srv.description,
              category: sub.name, // attach category name for grouping
              price:srv.custom_price,
              duration:"100min",
              imgSrc:"image",
              provider_id:srv.provider_id,
              description:srv.description

            }))
          );

        console.log("all service",allServices);
        }

        setServices(allServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  // 🧠 Group services by category
  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      acc[service.category] = acc[service.category] || [];
      acc[service.category].push(service);
      return acc;
    }, {});
  }, [services]);

  console.log("these are grouped ",groupedServices);


  const sectionRefs = useRef({});

useEffect(() => {
  Object.keys(groupedServices).forEach((cat) => {
    if (!sectionRefs.current[cat]) {
      sectionRefs.current[cat] = React.createRef();
    }
  });
}, [groupedServices]);



  // // Refs for smooth scroll sidebar
  // const sectionRefs = useMemo(() => {
  //   const refs = {};
  //   Object.keys(groupedServices).forEach((cat) => {
  //     refs[cat] = useRef(null);
  //   });
  //   return refs;
  // }, [groupedServices]);






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

    console.log("adding service",service);
    dispatch(addItem({
     id: service.id,
     title: service.title,
     price: service.price,
     category: service.category,
     providerId: service.provider_id, // <-- include providerId here
     quantity: 1
   }));
    // dispatch(addToCart({ ...service, quantity: 1 }));
    setQuantities((prev) => ({ ...prev, [service.id]: 1 }));
    toast.success("Item added to cart");
  };

  const handleIncrement = (service) => {
    dispatch(addItem({ ...service, quantity: 1 }));
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

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-24 bg-gray-50">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:fixed top-[64px] bottom-0 bg-white z-40 overflow-y-auto shadow-sm">

                {(sideBarItems && sideBarItems.length > 0) ? (

          <CustomSidebar items={sideBarItems} onScrollTo={handleScrollTo} />
          ):
                (<p>Data is not found</p>)}
        </aside>

        <main className="flex-1 p-4 md:p-6 md:ml-64 space-y-10">
          {Object.entries(groupedServices).map(([category, list]) => (
            <section key={category} id={category} ref={sectionRefs[category]}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {category}
              </h2>

              {list.length === 0 ? (
                <p className="text-gray-500">No services available.</p>
              ) : (
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
                            <span className="text-gray-500">• {service.duration || "—"}</span>
                          </div>
                        </div>

                        <div className="mt-1">
                          <button onClick={() => { setSelectedService(service); setIsModalOpen(true); document.body.style.overflow = 'hidden'; }} className="text-purple-600 text-[12px] sm:text-sm hover:underline">
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
                          // src={service.imgSrc || "/placeholder.jpg"}
                          src={"http://localhost:3000/services?type=ac"}
                          alt={service.description || service.description}
                          width={300}
                          height={200}
                          quality={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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


       {isModalOpen && selectedService && (
        <ServiceModal
          service={selectedService}
          groupedServices={services}
          onClose={() => { setIsModalOpen(false); setSelectedService(null); document.body.style.overflow = ''; }}
          
          onAdd={(s) => {

             dispatch(addItem({
     id: s.id,
     title: s.title,
     price: s.price,
     category: s.category,
     providerId: s.provider_id, // <-- include providerId here
     quantity: 1
   }));
            //  dispatch(addToCart({ ...s, quantity: 1 })); toast.success('Item added to cart'); 
            }}
          onDone={(s) => { 
            // dispatch(addToCart({ ...s, quantity: 1 }));
     dispatch(addItem({
     id: s.id,
     title: s.title,
     price: s.price,
     category: s.category,
     providerId: s.provider_id, // <-- include providerId here
     quantity: 1
   }));            
            router.push('/cart'); }}
          DetailComponent={ServiceDetail}
        />
      )}
    </div>
  );
}
