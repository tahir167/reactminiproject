import { createSlice } from '@reduxjs/toolkit';

// getFavoritesFromStorage və saveFavoritesToStorage funksiyaları artıq store.js-də yerləşdirilib.
// Slice sadəcə state-i idarə edir.

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    count: 0
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload.map(id => String(id));
      state.count = state.favorites.length;
    },
    toggleFavorite: (state, action) => {
      const productId = String(action.payload);
      const index = state.favorites.indexOf(productId);
      if (index !== -1) {
        state.favorites.splice(index, 1);
        state.count -= 1;
      } else {
        state.favorites.push(productId);
        state.count += 1;
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
      state.count = 0;
    }
  }
});

export const { setFavorites, toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;