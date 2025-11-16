'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { checkLogIn } from '@/src/lib/auth/auth';
import { createAnOrder } from '@/src/lib/api/api';
import { useLocation } from '@/app/components/location/LocationContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [phone, setPhone] = useState('');

  // mounted guard to prevent server/client mismatch
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = unknown on server

  // Location hook (must be a client hook). We'll sync after mount.
  const location = useLocation?.() || {};
  const {
    line1: ctxLine1,
    line2: ctxLine2,
    city: ctxCity,
    state: ctxState,
    postalCode: ctxPostalCode,
    lat: ctxLat,
    lng: ctxLng,
  } = location || {};

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lat, setLat] = useState(12.23);
  const [lng, setLng] = useState(12.23);

  // slots are generated only on client
  const [slots, setSlots] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // compute login state on client only
    try {
      setIsLoggedIn(Boolean(checkLogIn()));
    } catch (e) {
      setIsLoggedIn(false);
    }

    // sync location into local state (after mount)
    if (ctxLine1) setLine1(ctxLine1);
    if (ctxLine2) setLine2(ctxLine2);
    if (ctxCity) setCity(ctxCity);
    if (ctxState) setStateVal(ctxState);
    if (ctxPostalCode) setPostalCode(ctxPostalCode);
    if (ctxLat) setLat(ctxLat);
    if (ctxLng) setLng(ctxLng);

    // generate 1-hour slots starting at next full hour (client-only)
    const now = new Date();
    const start = new Date(now);
    start.setMinutes(0, 0, 0);
    if (now.getMinutes() > 0 || now.getSeconds() > 0) start.setHours(start.getHours() + 1);
    const result = [];
    for (let i = 0; i < 12; i++) {
      const s = new Date(start);
      s.setHours(start.getHours() + i);
      const e = new Date(s);
      e.setHours(s.getHours() + 1);
      result.push({ start: s, end: e });
    }
    setSlots(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on client

  const formatSlotLabel = (slot) => {
    const pad = (n) => String(n).padStart(2, '0');
    const sh = pad(slot.start.getHours());
    const sm = pad(slot.start.getMinutes());
    const eh = pad(slot.end.getHours());
    const em = pad(slot.end.getMinutes());
    return `${sh}:${sm} - ${eh}:${em}`;
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const taxesAndFees = 89;
  const totalAmount = itemTotal + taxesAndFees;

  const handleLogin = () => {
    router.push(`../auth/login`);
  };

  const validateAddress = () => {
    return line1 && city && stateVal && postalCode && lat != null && lng != null;
  };

  const bookOrder = async () => {
    if (!mounted) return; // ensure client-only action
    console.log('Booking Order function called');

    if (!isLoggedIn) {
      alert('Please login to continue');
      router.push(`../auth/login`);
      return;
    }

    if (!validateAddress()) {
      alert('Please select or enter a valid address');
      return;
    }

    if (selectedSlotIndex === null) {
      alert('Please select a time slot');
      return;
    }

    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    setLoading(true);

    const scheduledAt = slots[selectedSlotIndex].start.toISOString();

    try {
      const responses = await Promise.all(
        cartItems.map((item) =>
          createAnOrder(
            item.id,
            item.providerId || item.provider_id || null,
            scheduledAt,
            line1,
            line2,
            city,
            stateVal,
            postalCode,
            lat,
            lng,
            (item.price || 0) * (item.quantity || 1),
            item.specialInstructions || ''
          )
        )
      );

      const hasError = responses.some((r) => r?.error || r?.status === 'error' || !r);
      if (hasError) {
        console.error('createAnOrder responses', responses);
        alert('Some orders failed. Check console for details.');
      } else {
        toast.success('Order(s) placed successfully');
        router.push('/orders');
      }
    } catch (err) {
      console.error('error in booking order', err);
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  // Render deterministic placeholder server-side / before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>🛒</span> Checkout
        </h2>
        <div className="text-gray-500">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span>🛒</span> Checkout
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-4">
          {/* Account/Login Section */}
          {isLoggedIn === false && (
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
            <div className="text-xs text-gray-600 mb-2">Fetched from device/location (editable)</div>

            <input
              type="text"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              placeholder="Line 1"
              className="border px-2 py-1 w-full mb-2"
            />
            <input
              type="text"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="Line 2 (optional)"
              className="border px-2 py-1 w-full mb-2"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="border px-2 py-1 w-1/3"
              />
              <input
                type="text"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                placeholder="State"
                className="border px-2 py-1 w-1/3"
              />
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal Code"
                className="border px-2 py-1 w-1/3"
              />
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Lat: {lat ?? 'N/A'} • Lng: {lng ?? 'N/A'}
            </div>

            <div className="mt-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (typeof location?.openLocationModal === 'function') {
                    location.openLocationModal();
                  } else {
                    toast('Open location selector to update address');
                  }
                }}
              >
                Select an address
              </button>
            </div>
          </div>

          {/* Slot Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Select Slot</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlotIndex(idx)}
                  className={`text-sm border rounded px-3 py-2 text-left ${selectedSlotIndex === idx ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}
                >
                  <div className="font-medium">{formatSlotLabel(slot)}</div>
                  <div className="text-xs text-gray-500">1 hour</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Payment Method</div>
            <div className="text-sm text-gray-600">Pay on app (placeholder)</div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white p-4 rounded shadow text-xs text-gray-600">
            <div className="font-semibold mb-1">Cancellation policy</div>
            Free cancellations if done more than 12 hrs before the service or if a professional isn&apos;t assigned. A fee will be charged otherwise.
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
                    src={`${NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG}${item.image}`}
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
            </div>
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
              onClick={bookOrder}
              className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 disabled:opacity-50"
              disabled={loading || isLoggedIn === null || cartItems.length === 0}
            >
              {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
