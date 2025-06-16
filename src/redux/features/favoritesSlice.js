import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites: [], 
  count: 0
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const productId = action.payload
      if (!state.favorites.includes(productId)) {
        state.favorites.push(productId)
        state.count += 1
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload
      const index = state.favorites.indexOf(productId)
      if (index !== -1) {
        state.favorites.splice(index, 1)
        state.count -= 1
      }
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload
      const index = state.favorites.indexOf(productId)
      if (index !== -1) {
        state.favorites.splice(index, 1)
        state.count -= 1
      } else {
        state.favorites.push(productId)
        state.count += 1
      }
    }
  }
})

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer