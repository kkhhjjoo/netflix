import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-multi-carousel/lib/styles.css";
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './PopularMovie.style.css';
import './PopularMovie.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';


const PopularMoviesSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

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
      <MovieSlider title='Popular Movies' movies={data.results} />
    </div>
  )
}

export default PopularMoviesSlide
