import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  movies: [],
  likedMovies: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
  }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
