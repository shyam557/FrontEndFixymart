import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const quantityChange = item.quantity ?? 1;

      // ❗ Validate the item before processing
      if (!item || !item.id || !item.title || !item.price || !item.category) return;

      const existing = state.items.find(
        (i) => i.id === item.id && i.category === item.category
      );

      if (existing) {
        existing.quantity += quantityChange;

        // अगर quantity 0 या negative हो गई है तो remove कर दो
        if (existing.quantity <= 0) {
          state.items = state.items.filter(
            (i) => !(i.id === item.id && i.category === item.category)
          );
        }
      } else if (quantityChange > 0) {
        state.items.push({ ...item, quantity: quantityChange });
      }
    },

    decrementQuantity: (state, action) => {
      const { id, category } = action.payload;
      const existing = state.items.find(
        (item) => item.id === id && item.category === category
      );

      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          state.items = state.items.filter(
            (item) => !(item.id === id && item.category === category)
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      const { id, category } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.category === category)
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
