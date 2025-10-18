'use client';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';
import FullCheckout from './FullCheckout';

export default function CheckoutSection() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutClick = () => {
    if (isLoggedIn) {
      setShowCheckout(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="text-center my-4">
      <button
        onClick={handleCheckoutClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Checkout
      </button>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showCheckout && <FullCheckout />}
    </div>
  );
}
