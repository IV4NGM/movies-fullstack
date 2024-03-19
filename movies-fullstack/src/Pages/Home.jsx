import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '@/Components/Spinner/Spinner'
import { getAllGenres, getAllMovies, getContextMovies, resetApiState } from '@/Features/Movies/movieSlice'
import MoviesContainer from '@/Components/MoviesContainer/MoviesContainer'
import { toast } from 'react-toastify'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isError, isSuccess, message, errorType } = useSelector((state) => state.movie)

  const errorTypesAllowed = ['GET_GENRES', 'GET_MOVIES', 'LIKE_MOVIE']

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

  return (
    <div className='page-container'>
      <section className='heading'>
        <h3>Bienvenido {user && user.name}</h3>
      </section>
      <MoviesContainer />
      <MoviesContainer onlyLiked={false} />
    </div>
  )
}

export default Home
