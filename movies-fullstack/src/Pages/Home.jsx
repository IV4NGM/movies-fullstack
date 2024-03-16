import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '@/Components/Spinner/Spinner'
import { getAllGenres, getAllMovies, getContextMovies, reset } from '@/Features/Movies/movieSlice'
import MoviesContainer from '@/Components/MoviesContainer/MoviesContainer'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message } = useSelector((state) => state.movie)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

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
  }, [user, navigate, isError, message, dispatch])

  return (
    <div className='page-container'>
      <section className='heading'>
        <h3>Bienvenido {user && user.name}</h3>
      </section>
      <section>
        <MoviesContainer />
      </section>
      <section>
        <MoviesContainer onlyLiked={false} />
      </section>
    </div>
  )
}

export default Home
