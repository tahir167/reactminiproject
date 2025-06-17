import { createSlice } from '@reduxjs/toolkit';

const getBasketFromStorage = (userId) => {
  try {
    const basketData = localStorage.getItem(`basket_${userId}`);
    return basketData ? JSON.parse(basketData) : { items: [], totalCount: 0 };
  } catch (error) {
    console.error('Error getting basket from localStorage:', error);
    return { items: [], totalCount: 0 };
  }
};

const saveBasketToStorage = (userId, basketData) => {
  try {
    if (userId) {
      localStorage.setItem(`basket_${userId}`, JSON.stringify(basketData));
    } else {
      localStorage.removeItem('basket');
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [], 
    totalCount: 0
  },
  reducers: {
    setBasket: (state, action) => {
      state.items = action.payload.items || [];
      state.totalCount = action.payload.totalCount || 0;
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
        state.totalCount -= 1; 
      }
    },
    updateBasketQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const stringProductId = String(productId);
      const itemToUpdate = state.items.find(item => String(item.productId) === stringProductId);
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter(item => String(item.productId) !== stringProductId);
          state.totalCount -= 1; 
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