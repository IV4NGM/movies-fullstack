import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '@/Components/Spinner/Spinner'
import { getAllGenres, getAllMovies, getContextMovies, resetApiState } from '@/Features/Movies/movieSlice'
import MoviesContainer from '@/Components/MoviesContainer/MoviesContainer'
import { toast } from 'react-toastify'
// import Carousel from '@/Components/Carousel/MoviesCarousel'
// import MovieCarouselItem from '@/Components/Carousel/MovieCarouselItem'
import LoginInvitation from '@/Components/LoginInvitation/LoginInvitation'
import MoviesCarousel from '@/Components/Carousel/MoviesCarousel'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { movies, isError, isSuccess, message, errorType } = useSelector((state) => state.movie)

  const errorTypesAllowed = ['GET_MOVIES']

  useEffect(() => {
    if (user) {
      if (user.isVerified) {
        dispatch(getContextMovies())
      } else {
        navigate('/verification-pending/0')
      }
    } else {
      dispatch(getAllMovies())
    }
    dispatch(getAllGenres())
    return () => {
      dispatch(resetApiState())
    }
  }, [])

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      console.log(message)
      toast.error(message)
    }
    if (errorType !== 'AUTH') {
      dispatch(resetApiState())
    }
  }, [isError, isSuccess, message, errorType])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='page-container'>
      <section className='heading'>
        <h1>Eagle Blade</h1>
        <h3 className='head-title'>Las películas y series más taquilleras</h3>
      </section>
      <MoviesCarousel movies={movies.slice(0, 10)} />
      {!user && <LoginInvitation />}
      <MoviesContainer onlyLiked={false} />
    </div>
  )
}

export default Home
