import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  genres: [],
  movies: [],
  likedMovies: [],
  isLoading: false,
  isSuccess: false,
  successType: '',
  isError: false,
  errorType: '',
  message: ''
}

// Obtener todos los géneros
export const getAllGenres = createAsyncThunk('movies/get-genres', async (_, thunkAPI) => {
  try {
    return await movieService.getAllGenres()
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Obtener todas las películas (not logged)
export const getAllMovies = createAsyncThunk('movies/get-movies', async (_, thunkAPI) => {
  try {
    return await movieService.getAllMovies()
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Obtener todas las películas (logged)
export const getContextMovies = createAsyncThunk('movies/get-movies-context', async (_, thunkAPI) => {
  try {
    return await movieService.getContextMovies(thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Obtener una película (not logged)
export const getOneMovie = createAsyncThunk('movies/get-one-movie', async (movieId, thunkAPI) => {
  try {
    return await movieService.getOneMovie(movieId)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Obtener una película (logged)
export const getOneMovieContext = createAsyncThunk('movies/get-one-movie-context', async (movieId, thunkAPI) => {
  try {
    return await movieService.getOneMovieContext(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Like movie
export const likeMovie = createAsyncThunk('movies/like', async (movieId, thunkAPI) => {
  try {
    return await movieService.likeMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Disike movie
export const dislikeMovie = createAsyncThunk('movies/dislike', async (movieId, thunkAPI) => {
  try {
    return await movieService.dislikeMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Reset likes/dislikes
export const resetLikesMovie = createAsyncThunk('movies/reset-likes', async (movieId, thunkAPI) => {
  try {
    return await movieService.resetLikesMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Crear película
export const createMovie = createAsyncThunk('movies/create', async (movieData, thunkAPI) => {
  try {
    return await movieService.createMovie(movieData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Modificar película
// movieData debe incluir un campo movieId
export const updateMovie = createAsyncThunk('movies/update', async (movieData, thunkAPI) => {
  try {
    return await movieService.updateMovie(movieData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Eliminar película
export const deleteMovie = createAsyncThunk('movies/delete', async (movieId, thunkAPI) => {
  try {
    return await movieService.deleteMovie(movieId, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const handleError = (state, action) => {
  const sessionExpiredMessages = ['El usuario no se encuentra en la base de datos', 'Acceso no autorizado', 'No se proporcionó un token']
  if (sessionExpiredMessages.includes(action.payload)) {
    // state.showTokenModal = true
    // state.tokenModalInfo = {
    //   title: 'Sesión expirada',
    //   text: 'Tu sesión ha expirado. Vulve a iniciar sesión para continuar disfrutando de tus películas favoritas.',
    //   onYes: 'LOGIN',
    //   onNo: 'LOGIN',
    //   isCancelButton: false,
    //   textNo: '',
    //   textYes: 'Iniciar sesión',
    //   estatico: true
    // }
    state.errorType = 'AUTH'
  }
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetApiState: (state) => {
      state.isError = false
      state.errorType = ''
      state.isSuccess = false
      state.successType = ''
      state.isLoading = false
      state.message = ''
    }
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
        state.message = action.payload
        state.errorType = 'GET_GENRES'
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
        state.message = action.payload
        state.errorType = 'GET_MOVIES'
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
        state.message = action.payload
        state.errorType = 'GET_MOVIES'
        handleError(state, action)
      })
      .addCase(getOneMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const moviesIndex = state.movies.findIndex(movie => movie._id === action.payload._id)
        const likedMoviesIndex = state.likedMovies.findIndex(movie => movie._id === action.payload._id)
        if (moviesIndex === -1) {
          state.movies.push(action.payload)
        } else {
          state.movies = state.movies.map((movie, index) => {
            if (index === moviesIndex) {
              return action.payload
            }
            return movie
          })
        }
        if (likedMoviesIndex !== -1) {
          state.likedMovies = state.likedMovies.map((movie, index) => {
            if (index === moviesIndex) {
              return action.payload
            }
            return movie
          })
        }
      })
      .addCase(getOneMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'GET_ONE_MOVIE'
      })
      .addCase(getOneMovieContext.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneMovieContext.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const moviesIndex = state.movies.findIndex(movie => movie._id === action.payload._id)
        const likedMoviesIndex = state.likedMovies.findIndex(movie => movie._id === action.payload._id)
        if (moviesIndex === -1) {
          state.movies.push(action.payload)
        } else {
          state.movies = state.movies.map((movie, index) => {
            if (index === moviesIndex) {
              return action.payload
            }
            return movie
          })
        }
        if (likedMoviesIndex !== -1) {
          state.likedMovies = state.likedMovies.map((movie, index) => {
            if (index === moviesIndex) {
              return action.payload
            }
            return movie
          })
        }
      })
      .addCase(getOneMovieContext.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'GET_ONE_MOVIE'
        handleError(state, action)
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
        state.message = action.payload
        state.errorType = 'LIKE_MOVIE'
        handleError(state, action)
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
        state.message = action.payload
        state.errorType = 'LIKE_MOVIE'
        handleError(state, action)
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
        state.message = action.payload
        state.errorType = 'LIKE_MOVIE'
        handleError(state, action)
      })
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'CREATED_MOVIE'
        state.message = 'Película creada exitosamente'
        state.movies.push(action.payload)
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'CREATE_MOVIE'
        handleError(state, action)
      })
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'UPDATED_MOVIE'
        state.message = 'Película modificada exitosamente'
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
        state.message = action.payload
        state.errorType = 'UPDATE_MOVIE'
        handleError(state, action)
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'DELETED_MOVIE'
        state.message = 'Película eliminada exitosamente'
        state.movies = state.movies.filter((movie) => movie._id !== action.payload._id)
        state.likedMovies = state.likedMovies.filter((movie) => movie._id !== action.payload._id)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'DELETE_MOVIE'
        handleError(state, action)
      })
  }
})

export const { reset, resetApiState } = movieSlice.actions
export default movieSlice.reducer
