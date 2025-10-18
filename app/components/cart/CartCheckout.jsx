"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../../store/cartSlice"; // Adjust the path if needed

export default function CartCheckout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);

  if (totalQuantity === 0) return null;

  // Handler to remove all items from the cart
  const handleRemoveAll = () => {
    items.forEach(item => {
      dispatch(removeItem(item.id));
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center shadow-md md:hidden">
      <div className="text-sm font-medium">
        {totalQuantity} item{totalQuantity > 1 ? "s" : ""} • ₹{total}
      </div>
      <div className="flex gap-2">
        <button
          className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
          onClick={handleRemoveAll}
        >
          Remove All
        </button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
          View Cart
        </button>
      </div>
    </div>
  );
}