import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // payload: { id, title, price, quantity = 1, category, providerId, ... }
    addItem(state, action) {
      const incoming = action.payload;
      const idx = state.items.findIndex(
        i => i.id === incoming.id && i.providerId === incoming.providerId
      );
      if (idx >= 0) {
        state.items[idx].quantity = (state.items[idx].quantity || 1) + (incoming.quantity || 1);
      } else {
        state.items.push({
          ...incoming,
          quantity: incoming.quantity || 1
        });
      }
    },

    // alias: same as addItem for backward compatibility
    addToCart(state, action) {
      const incoming = action.payload;
      const idx = state.items.findIndex(
        i => i.id === incoming.id && i.providerId === incoming.providerId
      );
      if (idx >= 0) {
        state.items[idx].quantity = (state.items[idx].quantity || 1) + (incoming.quantity || 1);
      } else {
        state.items.push({
          ...incoming,
          quantity: incoming.quantity || 1
        });
      }
    },

    // payload: { id, providerId }
    removeFromCart(state, action) {
      const { id, providerId } = action.payload;
      state.items = state.items.filter(i => !(i.id === id && i.providerId === providerId));
    },

    // decrease quantity by 1 or remove item if quantity = 1
    decrementQuantity(state, action) {
      const { id, providerId } = action.payload;
      const idx = state.items.findIndex(
        i => i.id === id && i.providerId === providerId
      );
      if (idx >= 0) {
        if (state.items[idx].quantity > 1) {
          state.items[idx].quantity -= 1;
        } else {
          state.items = state.items.filter(i => !(i.id === id && i.providerId === providerId));
        }
      }
    },

    // flexible: payload can be id (legacy) or { id, providerId }
    removeItem(state, action) {
      const payload = action.payload;
      if (typeof payload === 'object' && payload !== null && payload.id) {
        const { id, providerId } = payload;
        state.items = state.items.filter(
          i => !(i.id === id && (providerId ? i.providerId === providerId : true))
        );
      } else {
        state.items = state.items.filter(i => i.id !== payload);
      }
    },

    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addItem,
  addToCart,
  removeFromCart,
  removeItem,
  clearCart,
  decrementQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
