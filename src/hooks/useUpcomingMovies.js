import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = async () => { 
  const { data } = await api.get('/movie/upcoming');

  const results = data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    genre_ids: movie.genre_ids,
    adult: movie.adult,
  }))
  return results;
}

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-upcoming'],
    queryFn: fetchUpcomingMovies,
    suspense: true,
  });
};