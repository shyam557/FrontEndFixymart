'use client';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQuantity } from '@/store/cartSlice';

export default function BuyService({ services }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const getQuantity = (id, category) => {
    const item = cart.find((i) => i.id === id && i.category === category);
    return item ? item.quantity : 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
      {services.map((service) => {
        const category = service.category;
        const quantity = getQuantity(service.id, category);

        return (
          <div key={`${service.id}-${category}`} className="border rounded-xl bg-white shadow-sm p-4 hover:shadow-md transition">
            <div className="relative h-48 w-full mb-2">
              <img
                src={service.imgSrc || '/images/placeholder.png'}
                alt={service.alt || service.title}
                className="object-cover rounded-md h-full w-full"
              />
            </div>
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-sm text-gray-500">{service.description}</p>
            {(service.rating || service.duration) && (
              <p className="text-xs text-gray-500 mt-1">
                {service.rating && `⭐ ${service.rating}`}
                {service.reviews && ` (${service.reviews})`}
                {service.duration && ` • ⏱ ${service.duration}`}
              </p>
            )}
            <p className="mt-1 font-bold text-green-600">₹{service.price}</p>
            <div className="mt-3 flex items-center justify-between">
              {quantity === 0 ? (
                <button
                  onClick={() =>
                    dispatch(addToCart({ ...service, quantity: 1, category }))
                  }
                  className="bg-purple-600 text-white px-4 py-1 rounded text-sm"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      dispatch(decrementQuantity({ id: service.id, category }))
                    }
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(addToCart({ ...service, quantity: 1, category }))
                    }
                    className="bg-purple-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
