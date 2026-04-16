import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatingMovies = async () => { 
  const { data } = await api.get('/movie/top_rated');

  const results = data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    genre_ids: movie.genre_ids,
    adult: movie.adult,
  }))
  return results;
}

export const useTopRatingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-top-rating'],
    suspense: true,
    queryFn: fetchTopRatingMovies,
  });
};