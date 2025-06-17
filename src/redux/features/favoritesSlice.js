import { createSlice } from '@reduxjs/toolkit';

const getFavoritesFromStorage = (userId) => {
  try {
    const favoritesData = localStorage.getItem(`favorites_${userId}`);
    return favoritesData ? JSON.parse(favoritesData) : [];
  } catch (error) {
    console.error('Error getting favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (userId, favoritesData) => {
  try {
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoritesData));
    } else {
      localStorage.removeItem('favorites');
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

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