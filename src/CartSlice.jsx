import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1
        });
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.name !== action.payload);
    }
  }
});

export const {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem
} = cartSlice.actions;

export default cartSlice.reducer;
