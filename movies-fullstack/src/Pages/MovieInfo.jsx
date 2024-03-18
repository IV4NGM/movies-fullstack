import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import LikesButton from '@/Components/LikesButton/LikesButton'
import { getOneMovieContext, resetApiState } from '@/Features/Movies/movieSlice'
import { toast } from 'react-toastify'

import NoMovie from '@/assets/NoMovie.jpg'

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
    // dispatch(resetApiState())
    if (user) {
      if (!user.isVerified) {
        navigate('/verification-pending/0')
      }
      dispatch(getOneMovieContext(id))
    } else {
      navigate('/login')
    }
    if (isError && errorTypesAllowed.includes(errorType)) {
      toast.error(message)
      dispatch(resetApiState())
    }

    return () => {
      dispatch(resetApiState())
    }
  }, [id, user, isError])

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
  releaseDate = new Date(movieData?.release_date) || new Date()

  return (
    <div className='page-container'>
      <h3 className='card-title'>{movieData?.title || 'Título'}</h3>

      <img
        src={movieData?.poster_path || NoMovie} className='card-img-top card-img-movie' alt='Poster' onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = NoMovie
        }}
      />
      <div className='movie-row-container'>
        <p className='card-text bold-text'>Calificación:</p>
        <p className='card-text'>{Math.round(movieData?.vote_average * 10) / 10 || '0'}</p>
        <img className='star-image' />
      </div>
      <div className='movie-row-container'>
        <p className='card-text bold-text'>Estreno:</p>
        <p className='card-text'>{releaseDate.toLocaleDateString()}</p>
      </div>
      <div className='movie-row-container'>
        <LikesButton like filled={movieData?.isLiked === 1} likesCount={movieData?.likes_count || 0} movieId={movieData?._id} />
        <LikesButton like={false} filled={movieData?.isLiked === -1} likesCount={movieData?.dislikes_count || 0} movieId={movieData?._id} />
      </div>
    </div>
  )
}

export default MovieInfo
