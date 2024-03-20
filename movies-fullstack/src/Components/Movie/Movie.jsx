/* eslint-disable react/prop-types */
import './Movie.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LikesButton from '@/Components/LikesButton/LikesButton'
import NoMovie from '@/assets/NoMovie.jpg'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'

import StarImage from '@/assets/star-icon.webp'
import { useState } from 'react'

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

  const isNotLoggedRedirect = (route) => {
    if (!user) {
      return '/login'
    }
    return route
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    // <div className='card movie-card'>
    //   {user?.isAdmin
    //     ? (
    //       <div
    //         className='edit-icon' onClick={(event) => {
    //           event.stopPropagation()
    //           navigate(`/edit/${movieData?._id}`)
    //         }}
    //       ><EditOutlinedIcon />
    //       </div>
    //     )
    //     : ''}
    //   <div className='card-body card-body-movie'>
    //     <h5 className='card-title'>{movieData.title}</h5>
    //     <img
    //       src={movieData.poster_path || NoMovie} className='card-img-top card-img-movie' alt='Poster' onError={({ currentTarget }) => {
    //         currentTarget.onerror = null
    //         currentTarget.src = NoMovie
    //       }}
    //     />
    //     <div className='movie-row-container'>
    //       <p className='card-text bold-text'>Calificación:</p>
    //       <p className='card-text'>{Math.round(movieData.vote_average * 10) / 10}</p>
    //       <img className='star-image' src={StarImage} />
    //     </div>
    //     <div className='movie-row-container'>
    //       <p className='card-text bold-text'>Estreno:</p>
    //       <p className='card-text'>{dateWithoutTime}</p>
    //     </div>
    //     <div className='movie-genres-container'>
    //       {movieData?.genres.map((genre, index) => <button className='btn btn-outline-secondary movie-genre' key={`movie-${movieData?._id}-genre-${index}`}>{genre.name}</button>)}
    //     </div>
    //     <div className='movie-row-container'>
    //       <LikesButton like filled={movieData.isLiked === 1} likesCount={movieData.likes_count} movieId={movieData._id} />
    //       <LikesButton like={false} filled={movieData.isLiked === -1} likesCount={movieData.dislikes_count} movieId={movieData._id} />
    //     </div>
    //     <Link to={isNotLoggedRedirect(`/movie/${movieData._id}`)} className='space-up'>Más información</Link>
    //   </div>
    // </div>
    <div className={'movie-card' + (showDetails ? ' movie-card-shadow' : '')} onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)} onClick={() => navigate(isNotLoggedRedirect(`/movie/${movieData._id}`))}>
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
      <img
        src={movieData?.poster_path || NoMovie} className={'card-img-movie movie-card-element' + (!showDetails ? ' movie-card-element-visible' : ' movie-card-element-invisible')} alt='Poster' onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = NoMovie
        }}
      />
      <div className={'movie-card-details' + (showDetails ? ' movie-card-element-visible' : ' movie-card-element-invisible')}>
        <img
          src={movieData?.backdrop_path || NoMovie} className='card-img-movie card-img-movie-backdrop' alt='Backdrop' onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = NoMovie
          }}
        />
        <h5 className='movie-card-title'>{movieData.title}</h5>
        <div className='movie-row-container'>
          <p>Calificación:</p>
          <p>{Math.round(movieData.vote_average * 10) / 10}</p>
          <img className='star-image' src={StarImage} />
        </div>
        <div className='movie-row-container'>
          <p>Estreno:</p>
          <p>{dateWithoutTime}</p>
        </div>
        <div className='movie-genres-container'>
          {movieData?.genres.map((genre, index) => <span className='movie-genre' key={`movie-${movieData?._id}-genre-${index}`}>{genre.name}</span>)}
        </div>
        <button className='btn btn-success movie-card-watch-now'><PlayArrowOutlinedIcon /> Ver ahora</button>
      </div>
    </div>
  )
}

export default Movie
