import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'users/'

// Creamos la petición al backend para crear un usuario
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Creamos la petición al backend para login usuario
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout a un usuario
const logout = () => {
  localStorage.removeItem('user')
}

// Get usuario
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

// Petición de enviar email de verificación
const sendVerificationEmail = async (email) => {
  const response = await axios.post(API_URL + 'send-verification-email', { email })

  return response.data
}

// Petición de verificar usuario
// userData = {id, token}
const verifyUser = async (userData) => {
  const response = await axios.post(API_URL + 'verify', userData)

  return response.data
}

// Petición de restablecer contraseña olvidada
const sendResetEmail = async (email) => {
  const response = await axios.post(API_URL + 'send-reset-email', { email })

  return response.data
}

// Restablecer contraseña olvidada
// userData = {id, token, password}
const resetPassword = async (userData) => {
  const response = await axios.post(API_URL + 'reset-password', userData)

  return response.data
}

// Actualizar contraseña
// userData = {password, newPassword, logout}
const updatePassword = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL + 'update-password', userData, config)

  return response.data
}

// Modificar usuario
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL, userData, config)

  return response.data
}

// Eliminar usuario
const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL, config)

  if (response.status === 200) {
    logout()
  }

  return response.data
}

const authService = {
  register,
  login,
  logout,
  getUser,
  sendVerificationEmail,
  verifyUser,
  sendResetEmail,
  resetPassword,
  updatePassword,
  updateUser,
  deleteUser
}

export default authService
