'use client';

import { useSelector, useDispatch } from 'react-redux';

import Image from 'next/image';
import { useState } from 'react';

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const [phone, setPhone] = useState('');
  const isLoggedIn = false; // No auth, always false
  // Dummy login handler
  const handleLogin = () => {
    // No-op
  };

  // Payment calculations
  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const taxesAndFees = 89;
  const totalAmount = itemTotal + taxesAndFees;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span>🛒</span> Checkout
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-4">
          {/* Account/Login Section */}
          {!isLoggedIn && (
            <div className="bg-white p-4 rounded shadow">
              <div className="mb-2 font-semibold">Account</div>
              <div className="mb-2 text-gray-600 text-sm">
                To book the service, please login or sign up
              </div>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="border px-2 py-1 w-full mb-2"
              />
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          )}

          {/* Address Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Address</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Select an address
            </button>
          </div>

          {/* Slot Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Slot</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Select a slot
            </button>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Payment Method</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Select payment method
            </button>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white p-4 rounded shadow text-xs text-gray-600">
            <div className="font-semibold mb-1">Cancellation policy</div>
            Free cancellations if done more than 12 hrs before the service or if a professional isn't assigned. A fee will be charged otherwise.
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[400px] space-y-4">
          {/* Cart Items */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Your Services</div>
            {cartItems.length === 0 ? (
              <div className="text-gray-500">No items in your cart.</div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="mb-2 flex items-center gap-2">
                  <Image
                    src={item.icon || '/icons/ac.png'}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                  <span>{item.title}</span>
                  <span className="ml-auto">₹{item.price} × {item.quantity || 1}</span>
                </div>
              ))
            )}
          </div>

          {/* Frequently Added Together */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Frequently added together</div>
            <div className="flex items-center gap-4">
              <div>
                <Image src="/icons/ac.png" alt="Anti-rust spray" width={40} height={40} />
                <div className="text-xs">Anti-rust spray<br />₹249</div>
                <button className="text-blue-600 text-xs">Add</button>
              </div>
              <div>
                <Image src="/icons/ac.png" alt="Gas refill" width={40} height={40} />
                <div className="text-xs">Gas refill & checkup<br />₹2,500</div>
                <button className="text-blue-600 text-xs">Add</button>
              </div>
            </div>
          </div>

          {/* Offers */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Coupons and offers</div>
            <div className="text-xs text-gray-600">Login/Sign up to view offers</div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Payment summary</div>
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes and Fees</span>
              <span>₹{taxesAndFees}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Total amount</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 border-t pt-2">
              <span>Amount to pay</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
              disabled={!isLoggedIn || cartItems.length === 0}
            >
              Pay ₹{totalAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}