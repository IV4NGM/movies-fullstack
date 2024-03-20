import { useNavigate } from 'react-router-dom'
import './MoviesCarousel.scss'

import NoMovie from '@/assets/NoMovie.jpg'
import { useSelector } from 'react-redux'

const MovieCarouselItem = ({ movieData }) => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const isNotLoggedRedirect = (route) => {
    if (!user) {
      return '/login'
    }
    return route
  }
  return (
    <div onClick={() => navigate(isNotLoggedRedirect(`/movie/${movieData._id}`))}>
      <div>
        <img src={movieData?.backdrop_path || NoMovie} className='d-block w-100' alt='Trending movies' />
        <p className='carousel-movie-title'>{movieData?.title}</p>
      </div>
    </div>
  )
}

export default MovieCarouselItem
