'use client';

import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../src/store/cartSlice'; // keep path consistent with your project

const categoryImages = {
  electrician: '/images/electrician.png',
  plumber: '/images/plumber.png',
  'AC Service & Repair': '/images/ac.png',
  default: '/images/placeholder.png',
};

export default function CartItemGrouped({ category, items, onAddServices, onCheckout }) {
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="bg-white rounded shadow p-4 mb-6 max-w-md mx-auto">
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={categoryImages[category] || categoryImages.default}
          alt={category}
          className="w-10 h-10 rounded object-cover"
        />
        <div>
          <h2 className="text-lg font-bold">{category}</h2>
          <p className="text-sm text-gray-500">
            {items.length} service{items.length > 1 ? 's' : ''} • ₹{total}
          </p>
        </div>
      </div>

      <ul className="ml-3 text-sm text-gray-700 list-disc">
        {items.map((item) => (
          <li key={`${item.id}-${item.providerId || 'noprov'}`} className="mb-1 flex justify-between items-center">
            <span>
              {item.title} x{item.quantity}
              {/* Example: show providerId for debugging */}
              {/* {item.providerId && <span className="text-xs text-gray-400 ml-2">provider:{item.providerId}</span>} */}
            </span>
            <button
              onClick={() => dispatch(removeFromCart({ id: item.id, providerId: item.providerId }))}
              className="text-red-600 text-xs ml-2 underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button
          onClick={onAddServices}
          className="px-4 py-2 border border-purple-600 text-purple-600 rounded text-sm"
        >
          Add Services
        </button>
        <button
          onClick={onCheckout}
          className="bg-purple-600 text-white px-4 py-2 rounded text-sm"
        >
           Book Service
        </button>
      </div>
    </div>
  );
}
