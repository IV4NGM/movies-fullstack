import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import LikesButton from '@/Components/LikesButton/LikesButton'

const MovieInfo = () => {
  const { id } = useParams()

  let movieData = []
  let releaseDate = {}

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { movies } = useSelector((state) => state.movie)

  const moviesIds = movies.map((movie) => movie._id)
  useEffect(() => {
    if (user) {
      if (!user.isVerified) {
        navigate('/verification-pending/0')
      }
    } else {
      navigate('/login')
    }
  }, [navigate, user])

  const movieIndex = moviesIds.findIndex((movieId) => movieId === id)

  if (movieIndex === -1) {
    return (
      <div className='page-container'>
        <h3>Ups, la película que buscas no existe</h3>
      </div>
    )
  } else {
    movieData = movies[movieIndex]
  }
  releaseDate = new Date(movieData.release_date)

  return (
    <div className='page-container'>
      <h3 className='card-title'>{movieData.title}</h3>

      <img src={movieData.poster_path} className='card-img-top card-img-movie' alt='Poster' />
      <div className='movie-row-container'>
        <p className='card-text bold-text'>Calificación:</p>
        <p className='card-text'>{Math.round(movieData.vote_average * 10) / 10}</p>
        <img className='star-image' />
      </div>
      <div className='movie-row-container'>
        <p className='card-text bold-text'>Estreno:</p>
        <p className='card-text'>{releaseDate.toLocaleDateString()}</p>
      </div>
      <div className='movie-row-container'>
        <LikesButton like filled={movieData.isLiked === 1} likesCount={movieData.likes_count} movieId={movieData._id} />
        <LikesButton like={false} filled={movieData.isLiked === -1} likesCount={movieData.dislikes_count} movieId={movieData._id} />
      </div>
    </div>
  )
}

export default MovieInfo
