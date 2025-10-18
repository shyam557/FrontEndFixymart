// /src/app/components/cart/CartItem.jsx
'use client';

import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <li className="text-sm text-gray-800 list-disc flex justify-between items-center mb-1">
      <div>
        {item.title}
        {item.quantity > 1 && (
          <span className="text-gray-500"> × {item.quantity}</span>
        )}
      </div>
      <button
        onClick={() =>
          dispatch(removeFromCart({ id: item.id, category: item.category }))
        }
        className="ml-2 text-red-500 text-xs underline"
      >
        Remove
      </button>
    </li>
  );
}
