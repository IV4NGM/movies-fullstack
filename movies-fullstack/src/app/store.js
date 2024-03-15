import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/Auth/authSlice'
import movieReducer from '../Features/Movies/movieSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer
  }
})
