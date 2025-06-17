import { createSlice } from '@reduxjs/toolkit'
import controller from '../../services/requests/productsRequest'; 
import { endpoints } from '../../constants';

const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

const saveUserToStorage = (userData) => {
  try {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id || userData._id || '');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUserFromStorage()
  },
  reducers: {
    login(state, action) {
      state.user = { ...action.payload };
      saveUserToStorage(state.user);
    },
    logOut(state) {
      state.user = null;
      saveUserToStorage(null);
    },

    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      saveUserToStorage(state.user);
    }
  }
});

export default userSlice.reducer;
export const { login, logOut, updateUser } = userSlice.actions;