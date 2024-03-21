import './MoviesCarousel.scss'
import Carousel from 'react-bootstrap/Carousel'
import MovieCarouselItem from './MovieCarouselItem'
import { useState } from 'react'
// import { CarouselItem } from 'react-bootstrap'

const MoviesCarousel = ({ movies }) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3500}>
      {movies && movies.map((movie, index) => (
        <Carousel.Item key={`carousel-movie-${index}`}>
          <MovieCarouselItem movieData={movie} key={`carousel-movie-info-${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default MoviesCarousel
