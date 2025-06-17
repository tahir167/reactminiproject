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

const loadUserDataAndPreferences = async () => {
  const currentUser = store.getState().user.user;
  if (currentUser && currentUser.id) {
    try {
      const userData = await controller.getOne(endpoints.users, currentUser.id);
      if (userData) {
        const storedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
        let favoritesToLoad = [];
        if (storedFavorites) {
          try {
            favoritesToLoad = JSON.parse(storedFavorites);
            favoritesToLoad = favoritesToLoad.map(id => String(id));
          } catch (parseError) {
            console.error("Error parsing stored favorites from localStorage, loading from db.json:", parseError);
            favoritesToLoad = (userData.favorites || []).map(id => String(id));
            saveFavoritesToStorage(currentUser.id, favoritesToLoad);
          }
        } else {
          favoritesToLoad = (userData.favorites || []).map(id => String(id));
          saveFavoritesToStorage(currentUser.id, favoritesToLoad);
        }
        store.dispatch(setFavorites(favoritesToLoad));

        const storedBasket = localStorage.getItem(`basket_${currentUser.id}`);
        let basketToLoad = { items: [], totalCount: 0 }; 

        if (storedBasket) {
          try {
            basketToLoad = JSON.parse(storedBasket);
            if (!basketToLoad.items || !Array.isArray(basketToLoad.items)) {
                basketToLoad.items = [];
            }
            if (typeof basketToLoad.totalCount !== 'number') {
                basketToLoad.totalCount = basketToLoad.items.length;
            }
          } catch (parseError) {
            console.error("Error parsing stored basket from localStorage, loading from db.json:", parseError);
            basketToLoad = userData.basket || { items: [], totalCount: 0 };
            saveBasketToStorage(currentUser.id, basketToLoad);
          }
        } else {
          basketToLoad = userData.basket || { items: [], totalCount: 0 };
          saveBasketToStorage(currentUser.id, basketToLoad);
        }
        
        if (!basketToLoad.items) basketToLoad.items = [];
        if (typeof basketToLoad.totalCount !== 'number') {
          basketToLoad.totalCount = basketToLoad.items.length;
        }
        
        store.dispatch(setBasket(basketToLoad)); 
      }
    } catch (error) {
      console.error('Error fetching user data on app load or user change:', error);
    }
  } else {
    store.dispatch(clearFavorites());
    store.dispatch(clearBasket());
  }
};

loadUserDataAndPreferences();

let currentUserId = store.getState().user.user?.id;
let previousFavoritesState = [];
let previousBasketState = { items: [], totalCount: 0 };

store.subscribe(async () => {
  const previousUserId = currentUserId;
  const currentUser = store.getState().user.user;
  currentUserId = currentUser?.id;

  if (previousUserId !== currentUserId) {
    await loadUserDataAndPreferences();
    previousFavoritesState = store.getState().favorites.favorites;
    previousBasketState = store.getState().basket;
    return;
  }

  if (currentUser && currentUser.id) {
    const currentFavoritesState = store.getState().favorites.favorites;
    if (JSON.stringify(currentFavoritesState) !== JSON.stringify(previousFavoritesState)) {
      previousFavoritesState = [...currentFavoritesState];
      saveFavoritesToStorage(currentUser.id, currentFavoritesState);
      try {
        await controller.update(endpoints.users, currentUser.id, { 
          favorites: currentFavoritesState.map(id => String(id)) 
        });
      } catch (error) {
        console.error('Error updating user favorites in db.json:', error);
      }
    }

    const currentBasketState = store.getState().basket;
    if (JSON.stringify(currentBasketState) !== JSON.stringify(previousBasketState)) {
      previousBasketState = { ...currentBasketState, items: [...currentBasketState.items] };
      saveBasketToStorage(currentUser.id, currentBasketState);
      try {
        await controller.update(endpoints.users, currentUser.id, { basket: currentBasketState });
      } catch (error) {
        console.error('Error updating user basket in db.json:', error);
      }
    }
  }
});