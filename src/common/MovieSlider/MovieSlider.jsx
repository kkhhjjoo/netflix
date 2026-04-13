import CarouselPkg from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.style.css'
import MovieCard from '../MovieCard/MovieCard'

const Carousel = CarouselPkg.default || CarouselPkg;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const MovieSlider = ({ title, movies }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Carousel
        infinite={true}
        itemClass='movie-slider p-1'
        containerClass='carousel-container'
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Carousel>
    </div>
  )
}

export default MovieSlider
