import '@/Styles/MovieInfo.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import LikesButton from '@/Components/LikesButton/LikesButton'
import { getOneMovieContext, resetApiState } from '@/Features/Movies/movieSlice'
import { toast } from 'react-toastify'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import NoMovie from '@/assets/NoMovie.jpg'
import StarImage from '@/assets/star-icon.webp'

import ReactPlayer from 'react-player/lazy'

const MovieInfo = () => {
  const { id } = useParams()

  let movieData = []
  let releaseDate = {}

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { movies, isError, isSuccess, message, errorType } = useSelector((state) => state.movie)

  const errorTypesAllowed = ['GET_ONE_MOVIE', 'LIKE_MOVIE']

  const moviesIds = movies.map((movie) => movie._id)
  useEffect(() => {
    if (user) {
      if (!user.isVerified) {
        navigate('/verification-pending/0')
      }
      dispatch(getOneMovieContext(id))
    } else {
      navigate('/login')
    }

    return () => {
      dispatch(resetApiState())
    }
  }, [id, user])

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      toast.error(message)
      if (message === 'La película no se encuentra en la base de datos') {
        navigate('/')
      }
    }
    if (errorType !== 'AUTH') {
      dispatch(resetApiState())
    }
  }, [isError, isSuccess, message, errorType])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const movieIndex = moviesIds.findIndex((movieId) => movieId === id)

  if (movieIndex === -1) {
    // return (
    //   <div className='page-container'>
    //     <h2>Ups, la película que buscas no existe</h2>
    //     <h3>Vuelve al inicio para disfrutar tus películas favoritas</h3>
    //     <button className='btn btn-success btn-lg spaced' onClick={() => navigate('/')}>Ir a Inicio</button>
    //   </div>
    // )
  } else {
    movieData = movies[movieIndex]
  }
  releaseDate = new Date(movieData?.release_date)
  releaseDate.setUTCHours(0, 0, 0, 0)
  const year = releaseDate.getUTCFullYear()
  const month = releaseDate.getUTCMonth() + 1
  const day = releaseDate.getUTCDate()

  // Construct the date string without the time component
  const dateWithoutTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

  return (
    <div className='page-container'>
      <h3 className='movie-info-title'>{movieData?.title || 'Título'}</h3>
      <div className='two-content two-content-movie-info'>
        <div className='movie-info-container movie-info-container-left'>
          <img
            src={movieData?.poster_path || NoMovie} className='movie-info-img' alt='Poster' onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = NoMovie
            }}
          />
          <div className='likes-row-container'>
            <LikesButton like filled={movieData?.isLiked === 1} likesCount={movieData?.likes_count || 0} movieId={movieData?._id} />
            <LikesButton like={false} filled={movieData?.isLiked === -1} likesCount={movieData?.dislikes_count || 0} movieId={movieData?._id} />
          </div>
        </div>
        <div className='movie-info-container movie-info-container-right'>
          <div className='movie-info-data-container'>
            <p className='property-name property-name-first'>Sinopsis</p>
            <p className='movie-overview'>{movieData?.overview}</p>
            <div className='row-separator' />
            <p className='property-name'>Géneros</p>
            <p className='movie-info-allow-wrap'>{movieData?.genres?.map((genre, index) => <span key={`movie-${movieData?._id}-genre-${index}`}><span className={'movie-genre movie-genre-info-page' + (index === 0 ? ' movie-genre-info-page-first' : '')}>{genre.name}</span>&nbsp;&nbsp;&nbsp;</span>)}</p>
            <p className='property-name'>Calificación</p>
            <p>{Math.round(movieData?.vote_average * 10) / 10 || '0'}</p>
            <p className='property-name'>Público recomendado</p>
            <p>{movieData?.adult ? 'Mayores de 18' : 'Para todo público'}</p>
            <p className='property-name'>Título original</p>
            <p>{movieData?.original_title}</p>
            <p className='property-name'>Idioma original</p>
            <p>{movieData?.original_language}</p>
            <p className='property-name'>Fecha de estreno</p>
            <p>{dateWithoutTime}</p>
          </div>
          {user?.isAdmin && <button className='btn btn-outline-secondary movie-info-edit-button' onClick={() => navigate(`/edit/${movieData?._id}`)}><EditOutlinedIcon /> Editar película</button>}
        </div>
      </div>
      <div className='react-player-container'>
        <ReactPlayer
          light={movieData?.backdrop_path || movieData?.poster_path || NoMovie}
          url='https://www.youtube.com/watch?v=Y4-sh2cVY1A&t=0s'
          width='inherit'
          height='inherit'
          controls
          playing
        />
      </div>
    </div>
  )
}

export default MovieInfo
