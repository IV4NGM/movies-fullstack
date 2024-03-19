import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'movies/'

// Obtener todos los géneros
const getAllGenres = async () => {
  const response = await axios.get(API_URL + 'genres')

  return response.data
}

// Obtener todas las películas (not logged)
const getAllMovies = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// Obtener todas las películas (logged)
const getContextMovies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + 'all', config)

  return response.data
}

// Obtener una película (not logged)
const getOneMovie = async (movieId) => {
  const response = await axios.get(API_URL + `/${movieId}`)

  return response.data
}

// Obtener una película (logged)
const getOneMovieContext = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `/context/${movieId}`, config)

  return response.data
}

// Like movie
const likeMovie = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `like/${movieId}`, config)

  return response.data
}

// Dislike movie
const dislikeMovie = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `dislike/${movieId}`, config)

  return response.data
}

// Reset likes/dislikes
const resetLikesMovie = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `reset-likes/${movieId}`, config)

  return response.data
}

// Crear película
const createMovie = async (movieData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, movieData, config)

  return response.data
}

// Modificar película
const updateMovie = async (movieData, token) => {
  const { movieId, ...movieDataToUpdate } = movieData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + movieId, movieDataToUpdate, config)

  return response.data
}

// Eliminar película
const deleteMovie = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + movieId, config)

  return response.data
}

const movieService = {
  getAllGenres,
  getAllMovies,
  getContextMovies,
  getOneMovie,
  getOneMovieContext,
  likeMovie,
  dislikeMovie,
  resetLikesMovie,
  createMovie,
  updateMovie,
  deleteMovie
}

export default movieService
