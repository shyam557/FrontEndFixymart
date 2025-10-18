"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "@/store/cartSlice";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { MdOutlinePriceChange } from "react-icons/md";

export default function BuyService({ services }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const isInCart = (id, category) =>
    cartItems.find((item) => item.id === id && item.category === category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const cartItem = isInCart(service.id, service.category);

        return (
          <div
            key={service.id}
            className="flex justify-between items-center p-4 rounded-lg shadow hover:shadow-md bg-white h-[300px]"
          >
            {/* Left content */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-base font-semibold text-gray-900">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600">{service.description}</p>

              {/* 👇 View Details Button */}
              <button
                className="text-purple-600 text-sm underline w-fit mt-1 cursor-pointer"
                type="button"
              >
                View details
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <span className="text-lg font-bold text-black">
                  ₹{service.price}
                </span>
                <span className="line-through">₹2,396</span>
                <span className="flex items-center gap-1">
                  <FiClock size={14} /> 3 hrs
                </span>
              </div>

              <div className="flex items-center gap-1 text-green-600 text-sm">
                <MdOutlinePriceChange size={16} /> ₹499 per AC
              </div>
            </div>

            {/* Right content */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-48 h-40  rounded overflow-hidden">
                <Image
                  src={service.imgSrc}
                  alt={service.alt || service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {cartItem ? (
                <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-full">
                  <button
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          id: service.id,
                          category: service.category,
                        })
                      )
                    }
                    className="w-6 h-6 text-base bg-white text-black rounded-full"
                  >
                    −
                  </button>
                  <span className="text-base font-medium">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...service,
                          quantity: 1,
                          category: service.category,
                        })
                      )
                    }
                    className="w-6 h-6 text-base bg-white text-black rounded-full"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...service,
                        quantity: 1,
                        category: service.category,
                      })
                    )
                  }
                  className="border border-purple-600 text-purple-600 px-4 py-1 rounded-md text-sm hover:bg-purple-50"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
