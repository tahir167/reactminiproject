
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../../redux/features/userSlice"
import favoritesReducer from "../../redux/features/favoritesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer
  },
})