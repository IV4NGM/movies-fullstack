/* eslint-disable react/prop-types */
import './Movie.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LikesButton from '@/Components/LikesButton/LikesButton'
import NoMovie from '@/assets/NoMovie.jpg'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const Movie = ({ movieData }) => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const releaseDate = new Date(movieData.release_date)
  releaseDate.setUTCHours(0, 0, 0, 0)
  const year = releaseDate.getUTCFullYear()
  const month = releaseDate.getUTCMonth() + 1
  const day = releaseDate.getUTCDate()

  // Construct the date string without the time component
  const dateWithoutTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  return (
    <div className='card movie-card'>
      {user?.isAdmin
        ? (
          <div
            className='edit-icon' onClick={(event) => {
              event.stopPropagation()
              navigate(`/edit/${movieData?._id}`)
            }}
          ><EditOutlinedIcon />
          </div>
        )
        : ''}
      <div className='card-body card-body-movie'>
        <h5 className='card-title'>{movieData.title}</h5>
        <img
          src={movieData.poster_path || NoMovie} className='card-img-top card-img-movie' alt='Poster' onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = NoMovie
          }}
        />
        <div className='movie-row-container'>
          <p className='card-text bold-text'>Calificación:</p>
          <p className='card-text'>{Math.round(movieData.vote_average * 10) / 10}</p>
          <img className='star-image' />
        </div>
        <div className='movie-row-container'>
          <p className='card-text bold-text'>Estreno:</p>
          <p className='card-text'>{dateWithoutTime}</p>
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
