import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarouselPkg from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTopRatingMoviesQuery } from '../../../../hooks/useTopRatingMovies';

import MovieCard from '../MovieCard/MovieCard';
import './TopRating.style.css';
import { useEffect, useState } from 'react';
import { fetchGenres } from '../../../../utils/genres';

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


const TopRatingMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatingMoviesQuery();
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    fetchGenres().then(setGenreMap);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    toast.error(error.message);
    return null;
  }
  return (
    <div>
      <ToastContainer />
      <h3>Top Rating Movies</h3>
      <Carousel

        infinite={true}
        itemClass='movie-slider p-1'
        containerClass='carousel-container'
        responsive={responsive}

        >
        {data.map((movie, index) => (
          <MovieCard key={index} movie={movie} genreMap={genreMap} />
        ))}
      </Carousel>
    </div>
  )
}

export default TopRatingMovieSlide;
