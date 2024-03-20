import './Carousel.scss'
import MovieCarouselItem from './MovieCarouselItem'

const Carousel = ({ movies }) => {
  return (
    <div id='carouselAutoplaying' className='carousel slide' data-bs-ride='carousel' data-bs-interval='5000'>
      <div className='carousel-inner'>
        {movies.map((movie, index) => {
          return <MovieCarouselItem movieData={movie} active={index === 0} key={`carousel-movie-${index}`} />
        })}
      </div>
      <button className='carousel-control-prev' type='button' data-bs-target='#carouselAutoplaying' data-bs-slide='prev'>
        <span className='carousel-control-prev-icon' aria-hidden='true' />
        <span className='visually-hidden'>Previous</span>
      </button>
      <button className='carousel-control-next' type='button' data-bs-target='#carouselAutoplaying' data-bs-slide='next'>
        <span className='carousel-control-next-icon' aria-hidden='true' />
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  )
}

export default Carousel
