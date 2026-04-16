import { useQuery } from '@tanstack/react-query'
import api from '../utils/api';

const fetchSearchMovie = ({ keyword, page, genreId, sortBy }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`)
  }
  const sort = sortBy || 'popularity.desc';
  if (genreId) {
    return api.get(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=${sort}`)
  }
  return api.get(`/discover/movie?page=${page}&sort_by=${sort}`)
}

export const useSearchMovieQuery = ({keyword, page, genreId, sortBy}) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page, genreId, sortBy }],
    queryFn: () => fetchSearchMovie({ keyword, page, genreId, sortBy }),
    select: (result) => result.data
  });
}