import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice";
import favoritesReducer, { setFavorites, clearFavorites } from "../features/favoritesSlice";
import basketReducer, { setBasket, clearBasket } from "../features/basketSlice";
import controller from '../../services/requests/productsRequest.js';
import { endpoints } from '../../constants/index.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    basket: basketReducer
  },
});

let currentUserId = store.getState().user.user?.id;

store.subscribe(async () => {
  const previousUserId = currentUserId;
  const currentUser = store.getState().user.user;
  currentUserId = currentUser?.id;

  if (previousUserId !== currentUserId) {
    if (currentUser) {
      try {
        const userData = await controller.getOne(endpoints.users, currentUser.id);
        if (userData) {
          const storedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
          if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            const stringFavorites = parsedFavorites.map(id => String(id));
            store.dispatch(setFavorites(stringFavorites));
          } else {
            const userFavorites = (userData.favorites || []).map(id => String(id));
            store.dispatch(setFavorites(userFavorites));
            localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(userFavorites));
          }

          const storedBasket = localStorage.getItem(`basket_${currentUser.id}`);
          if (storedBasket) {
            store.dispatch(setBasket(JSON.parse(storedBasket)));
          } else {
            store.dispatch(setBasket(userData.basket || { items: [], totalCount: 0 }));
            localStorage.setItem(`basket_${currentUser.id}`, JSON.stringify(userData.basket || { items: [], totalCount: 0 }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data on login:', error);
      }
    } else {
      store.dispatch(clearFavorites());
      store.dispatch(clearBasket());
      if (previousUserId) {
        localStorage.removeItem(`favorites_${previousUserId}`);
        localStorage.removeItem(`basket_${previousUserId}`);
      }
    }
  }

  const favoritesState = store.getState().favorites.favorites;
  if (currentUser && currentUser.id) {
    const storedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
    if (JSON.stringify(favoritesState) !== storedFavorites) {
      saveFavoritesToStorage(currentUser.id, favoritesState);
      try {
        const stringFavorites = favoritesState.map(id => String(id));
        await controller.update(endpoints.users, currentUser.id, { favorites: stringFavorites });
      } catch (error) {
        console.error('Error updating user favorites in db.json:', error);
      }
    }
  }

  const basketState = store.getState().basket;
  if (currentUser && currentUser.id) {
    const storedBasket = localStorage.getItem(`basket_${currentUser.id}`);
    if (JSON.stringify(basketState) !== storedBasket) {
      saveBasketToStorage(currentUser.id, basketState);
      try {
        await controller.update(endpoints.users, currentUser.id, { basket: basketState });
      } catch (error) {
        console.error('Error updating user basket in db.json:', error);
      }
    }
  }
});

const saveFavoritesToStorage = (userId, favoritesData) => {
  try {
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoritesData));
    }
  } catch (error) {
    console.error('localStorage error saving favorites:', error);
  }
};

const saveBasketToStorage = (userId, basketData) => {
  try {
    if (userId) {
      localStorage.setItem(`basket_${userId}`, JSON.stringify(basketData));
    }
  } catch (error) {
    console.error('localStorage error saving basket:', error);
  }
};