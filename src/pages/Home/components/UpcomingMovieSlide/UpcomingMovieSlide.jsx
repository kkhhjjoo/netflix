import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-multi-carousel/lib/styles.css";
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';

import './UpcomingMovieSlide.style.css';
import { useEffect } from 'react';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';



const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  
  if (isError) {
    return null;
  }
  return (
    <div>
      <ToastContainer />
      <MovieSlider title="Upcoming Movie" movies={data} />
    </div>
  )
}

export default UpcomingMovieSlide
