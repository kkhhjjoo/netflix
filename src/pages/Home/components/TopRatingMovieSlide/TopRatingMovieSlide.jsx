import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-multi-carousel/lib/styles.css";
import { useTopRatingMoviesQuery } from '../../../../hooks/useTopRatingMovies';

import './TopRating.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';


const TopRatingMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatingMoviesQuery();

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
      <MovieSlider title="TopRating Movie" movies={data} />
    </div>
  )
}

export default TopRatingMovieSlide;
