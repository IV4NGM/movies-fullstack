import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  genres: [],
  movies: [],
  likedMovies: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Obtener todos los géneros
export const getAllGenres = createAsyncThunk('movies/get-genres', async (_, thunkAPI) => {
  try {
    return await movieService.getAllGenres()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Obtener todas las películas (not logged)
export const getAllMovies = createAsyncThunk('movies/get-movies', async (_, thunkAPI) => {
  try {
    return await movieService.getAllMovies()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Obtener todas las películas (logged)
export const getContextMovies = createAsyncThunk('movies/get-movies-context', async (_, thunkAPI) => {
  try {
    return await movieService.getContextMovies(thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Like movie
export const likeMovie = createAsyncThunk('movies/like', async (movieId, thunkAPI) => {
  try {
    return await movieService.likeMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Disike movie
export const dislikeMovie = createAsyncThunk('movies/dislike', async (movieId, thunkAPI) => {
  try {
    return await movieService.dislikeMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Reset likes/dislikes
export const resetLikesMovie = createAsyncThunk('movies/reset-likes', async (movieId, thunkAPI) => {
  try {
    return await movieService.resetLikesMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Crear película
export const createMovie = createAsyncThunk('movies/create', async (movieData, thunkAPI) => {
  try {
    return await movieService.createMovie(movieData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Modificar película
// movieData debe incluir un campo movieId
export const updateMovie = createAsyncThunk('movies/update', async (movieData, thunkAPI) => {
  try {
    return await movieService.updateMovie(movieData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Eliminar película
export const deleteMovie = createAsyncThunk('movies/delete', async (movieId, thunkAPI) => {
  try {
    return await movieService.deleteMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGenres.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllGenres.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.genres = action.payload
      })
      .addCase(getAllGenres.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getAllMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getContextMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContextMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
        state.likedMovies = action.payload.filter((movie) => movie.isLiked === 1)
      })
      .addCase(getContextMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(likeMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(likeMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload
          }
          return movie
        })
        state.likedMovies.push(action.payload)
      })
      .addCase(likeMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(dislikeMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(dislikeMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload
          }
          return movie
        })
        state.likedMovies = state.likedMovies.filter((movie) => movie._id !== action.payload._id)
      })
      .addCase(dislikeMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(resetLikesMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetLikesMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload
          }
          return movie
        })
        state.likedMovies = state.likedMovies.filter((movie) => movie._id !== action.payload._id)
      })
      .addCase(resetLikesMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies.push(action.payload)
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload
          }
          return movie
        })
        state.likedMovies = state.likedMovies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload
          }
          return movie
        })
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.filter((movie) => movie._id !== action.payload._id)
        state.likedMovies = state.likedMovies.filter((movie) => movie._id !== action.payload._id)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
