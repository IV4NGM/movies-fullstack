import { useNavigate } from 'react-router-dom'
import './Carousel.scss'

import NoMovie from '@/assets/NoMovie.jpg'
import { useSelector } from 'react-redux'

const MovieCarouselItem = ({ movieData, active }) => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const isNotLoggedRedirect = (route) => {
    if (!user) {
      return '/login'
    }
    return route
  }
  return (
    <div className={'carousel-item' + (active ? ' active' : '')} onClick={() => navigate(isNotLoggedRedirect(`/movie/${movieData._id}`))}>
      <div className='carousel-item-container'>
        <img src={movieData?.backdrop_path || NoMovie} className='d-block w-100' alt='Trending movies' />
        <p className='carousel-movie-title'>{movieData?.title}</p>
      </div>
    </div>
  )
}

export default MovieCarouselItem
