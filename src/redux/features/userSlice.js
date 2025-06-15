import { createSlice } from '@reduxjs/toolkit'

const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    return null
  }
}

const saveUserToStorage = (userData) => {
  try {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('userId', userData.id || userData._id || '')
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
    }
  } catch (error) {
    console.error('localStorage error:', error)
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUserFromStorage() 
  },
  reducers: {
    login(state, action) {
      state.user = { ...action.payload }
      saveUserToStorage(state.user)
    },
    logOut(state) {
      state.user = null
      saveUserToStorage(null) 
    }
  }
})

export default userSlice.reducer
export const { login, logOut } = userSlice.actions