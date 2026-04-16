import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieVideos = (id) => {
  return api.get(`/movie/${id}/videos?language=en-US`);
};

export const useMovieVideosQuery = (id) => {
  return useQuery({
    queryKey: ['movie-videos', id],
    queryFn: () => fetchMovieVideos(id),
    select: (result) => {
      const videos = result.data.results;
      // 공식 예고편 우선, 없으면 Teaser, 없으면 첫 번째 YouTube 영상
      return (
        videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
        videos.find(v => v.type === 'Teaser' && v.site === 'YouTube') ||
        videos.find(v => v.site === 'YouTube') ||
        null
      );
    },
    enabled: !!id,
  });
};
