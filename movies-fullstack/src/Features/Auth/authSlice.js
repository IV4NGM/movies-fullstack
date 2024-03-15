import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Obtenemos del localStorage los datos del usuario
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
