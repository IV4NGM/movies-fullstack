import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Importar las acciones de movieSlice que pueden causar error de AUTH
import { getContextMovies, getOneMovieContext, likeMovie, dislikeMovie, resetLikesMovie, createMovie, updateMovie, deleteMovie } from '@/Features/Movies/movieSlice'

// Obtenemos del localStorage los datos del usuario
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isError: false,
  errorType: '',
  isSuccess: false,
  successType: '',
  isLoading: false,
  message: '',
  showTokenModal: false,
  tokenModalInfo: {}
}

// Registrar un nuevo usuario
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login un usuario
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Petición de enviar email de verificación
export const sendVerificationEmail = createAsyncThunk('auth/send-verification-email', async (email, thunkAPI) => {
  try {
    return await authService.sendVerificationEmail(email)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Petición de verificar usuario
export const verifyUser = createAsyncThunk('auth/verify', async (userData, thunkAPI) => {
  try {
    return await authService.verifyUser(userData)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Petición de restablecer contraseña olvidada
export const sendResetEmail = createAsyncThunk('auth/send-reset-email', async (email, thunkAPI) => {
  try {
    return await authService.sendResetEmail(email)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Restablecer contraseña olvidada
export const resetPassword = createAsyncThunk('auth/reset-password', async (userData, thunkAPI) => {
  try {
    return await authService.resetPassword(userData)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Actualizar contraseña
// userData = {password, newPassword, logout}
export const updatePassword = createAsyncThunk('auth/update-password', async (userData, thunkAPI) => {
  try {
    return await authService.updatePassword(userData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Modificar usuario
export const updateUser = createAsyncThunk('auth/update-user', async (userData, thunkAPI) => {
  try {
    return await authService.updateUser(userData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Eliminar usuario
// thunkAPI.getState().auth.user.token
export const deleteUser = createAsyncThunk('auth/delete-user', async (_, thunkAPI) => {
  try {
    return await authService.deleteUser(thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const setShowTokenModal = createAsyncThunk('auth/token-modal', async (value, thunkAPI) => {
  return value
})

const handleError = (state, action) => {
  const sessionExpiredMessages = ['El usuario no se encuentra en la base de datos', 'Acceso no autorizado', 'No se proporcionó un token']
  if (sessionExpiredMessages.includes(action.payload)) {
    state.showTokenModal = true
    state.tokenModalInfo = {
      title: 'Sesión expirada',
      text: 'Tu sesión ha expirado. Vulve a iniciar sesión para continuar disfrutando de tus películas favoritas.',
      onYes: 'LOGIN',
      onNo: 'LOGIN',
      isCancelButton: false,
      textNo: '',
      textYes: 'Iniciar sesión',
      estatico: true
    }
    state.isError = true
    state.errorType = 'AUTH'
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.errorType = ''
      state.isSuccess = false
      state.successType = ''
      state.isLoading = false
      state.message = ''
      state.showTokenModal = false
      state.tokenModalInfo = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.successType = 'LOGIN'
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'LOGIN'
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if (action.payload._id === state.user?._id) {
          state.user = action.payload
          localStorage.setItem('user', JSON.stringify(action.payload))
        }
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(sendResetEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = 'Contraseña actualizada exitosamente'
        state.successType = 'UPDATED_PASSWORD'
        if (action.payload.logout) {
          state.successType = 'UPDATED_PASSWORD_LOGOUT'
        }
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'UPDATE_PASSWORD'
        handleError(state, action)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.name = action.payload.name
        state.message = 'Datos actualizados correctamente'
        state.successType = 'UPDATED_USER'
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'UPDATE_USER'
        handleError(state, action)
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
        state.message = 'Usuario eliminado exitosamente'
        state.successType = 'DELETED_USER'
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'DELETE_USER'
        handleError(state, action)
      })
      .addCase(getContextMovies.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(getOneMovieContext.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(likeMovie.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(dislikeMovie.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(resetLikesMovie.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(createMovie.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(updateMovie.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        handleError(state, action)
      })
      .addCase(setShowTokenModal.fulfilled, (state, action) => {
        state.showTokenModal = action.payload
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
