/* eslint-disable react/prop-types */
import './Movie.scss'
import { Link } from 'react-router-dom'
import LikesButton from '@/Components/LikesButton/LikesButton'

const Movie = ({ movieData }) => {
  const releaseDate = new Date(movieData.release_date)
  releaseDate.setUTCHours(0, 0, 0, 0)
  return (
    <div className='card movie-card'>
      <div className='card-body card-body-movie'>
        <h5 className='card-title'>{movieData.title}</h5>
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
        <Link to={`/movie/${movieData._id}`} className='space-up'>Más información</Link>
      </div>
    </div>
  )
}

export default Movie
