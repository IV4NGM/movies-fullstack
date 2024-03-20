/* eslint-disable react/prop-types */
import './MoviesContainer.scss'
import { useSelector } from 'react-redux'
import Movie from '@/Components/Movie/Movie'

const MoviesContainer = ({ onlyLiked = true }) => {
  const { movies, likedMovies } = useSelector((state) => state.movie)
  if ((onlyLiked && likedMovies.length === 0) || (!onlyLiked && movies.length === 0)) return <></>
  return (
    <div className='movies-container-div'>
      <h2 className='space-up-lg space-down-lg'>{onlyLiked ? 'Me gusta' : 'Consulta nuestro catálogo'}</h2>
      <div className='movies-container'>
        {
          onlyLiked
            ? likedMovies.map((movie, index) => <Movie movieData={movie} key={`liked-${index}`} />)
            : movies.map((movie, index) => <Movie movieData={movie} key={`all-${index}`} />)
        }
      </div>
    </div>

  )
}

export default MoviesContainer
