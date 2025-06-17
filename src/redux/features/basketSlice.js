import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
    totalCount: 0
  },
  reducers: {
    setBasket: (state, action) => {
      // Payload-un düzgün formatda olduğundan əmin olun
      const payload = action.payload || { items: [], totalCount: 0 };
      state.items = Array.isArray(payload.items) ? payload.items : [];
      // totalCount-u items sayına uyğun hesabla
      state.totalCount = state.items.length;
    },
    addToBasket: (state, action) => {
      const { productId, quantity = 1 } = action.payload;
      const stringProductId = String(productId);
      const existingItem = state.items.find(item => String(item.productId) === stringProductId);
       
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId: stringProductId, quantity });
        state.totalCount += 1;
      }
    },
    removeFromBasket: (state, action) => {
      const productIdToRemove = String(action.payload);
      const index = state.items.findIndex(item => String(item.productId) === productIdToRemove);
       
      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalCount = state.items.length; // totalCount-u yenidən hesabla
      }
    },
    updateBasketQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const stringProductId = String(productId);
      const itemToUpdate = state.items.find(item => String(item.productId) === stringProductId);
       
      if (itemToUpdate) {
        if (quantity <= 0) {
          // Məhsulu sil
          state.items = state.items.filter(item => String(item.productId) !== stringProductId);
          state.totalCount = state.items.length;
        } else {
          itemToUpdate.quantity = quantity;
        }
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.totalCount = 0;
    }
  }
});

export const { addToBasket, removeFromBasket, updateBasketQuantity, setBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;