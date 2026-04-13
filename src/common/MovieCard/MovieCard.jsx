import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import './MovieCard.style.css';

const MovieCard = ({ movie }) => {

  const { data: genreData } = useMovieGenreQuery();

  const genreNames = movie.genre_ids.map(
    (id) => genreData?.find((genre) => genre.id === id)?.name ?? "기타"
  );

  return (
    <div className='movie-card' style={{background: `url(https://media.themoviedb.org/t/p/w600_and_h900_face/${movie.poster_path})`}}>
      <div className='overlay'>
        <h1>{movie.title}</h1>
        <div className='red-group'>
        {genreNames.map((name, index) => (<span key={index} className='redBtn'>{name}</span>))}
      </div>
        <div className='badge'>
          {movie.adult ?  (<span className="adult">18</span>) : (<span className='age'>all</span>)}
      </div>
    </div>
  </div>  
  )
}

export default MovieCard
