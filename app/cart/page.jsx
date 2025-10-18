'use client';

import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartItemGrouped from '../components/cart/CartGroup';

export default function CartPage() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Group items by category
  const grouped = cartItems.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <ShoppingCart className="text-purple-600" />
        <h1 className="text-xl font-semibold">Your cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">Your cart is empty</p>
      ) : (
        <>
          {Object.entries(grouped).map(([category, items]) => (
            <CartItemGrouped
              key={category}
              category={category}
              items={items}
              onAddServices={() => router.push('/services')}
              onCheckout={handleCheckout}
            />
          ))}
        </>
      )}
    </div>
  );
}
