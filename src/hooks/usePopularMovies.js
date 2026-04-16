import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = async () => {
  const [defaultRes, koRes] = await Promise.all([
    api.get('/movie/popular'),
    api.get('/movie/popular', { params: { language: 'ko-KR' } })
  ]);

  const koMap = new Map(koRes.data.results.map(m => [m.id, m]));

  const results = defaultRes.data.results.map(movie =>
    movie.original_language === 'ko' ? (koMap.get(movie.id) || movie) : movie
  );

  return { ...defaultRes, data: { ...defaultRes.data, results } };
}


export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: fetchPopularMovies,
    suspense: true,
    select: (result) => result.data
  });
};