import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import './Banner.style.css';

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log('ddd', data);
  
  if (isError) { 
    toast.error(error.message);
  }
  return (
    <div className='banner' style={{background: `url(https://media.themoviedb.org/t/p/w600_and_h900_face/${data.results[0].poster_path})`}}>
      <ToastContainer />
      <div className='text-white'>
        <h1>{data.results[0].title}</h1>
        <p style={{fontSize: '14px', lineHeight: '1.6', marginTop: '8px'}}>{data.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner
