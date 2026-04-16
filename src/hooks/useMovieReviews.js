import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReviews = (id) => {
  return api.get(`/movie/${id}/reviews?language=en-US&page=1`);
};

export const useMovieReviewsQuery = (id) => {
  return useQuery({
    queryKey: ['movie-reviews', id],
    queryFn: () => fetchMovieReviews(id),
    select: (result) => result.data.results,
    enabled: !!id,
  });
};
