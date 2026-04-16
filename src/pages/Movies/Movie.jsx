import { useEffect, useState } from 'react'
import './Movie.style.css'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import MovieCard from '../../common/MovieCard/MovieCard';
import _ReactPaginate from 'react-paginate';
const ReactPaginate = _ReactPaginate.default ?? _ReactPaginate;



//경로 2가지
//1. nav바에서 클릭해서 온 경우 => popularMovie보여주기
//2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page바꿔주기
//page값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch
const Movie = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const [page, setPage] = useState(1);
  const [prevKeyword, setPrevKeyword] = useState(keyword);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const SORT_OPTIONS = [
    { value: 'popularity.desc', label: '인기 높은순' },
    { value: 'popularity.asc',  label: '인기 낮은순' },
    { value: 'vote_average.desc', label: '평점 높은순' },
    { value: 'vote_average.asc',  label: '평점 낮은순' },
    { value: 'release_date.desc', label: '최신순' },
    { value: 'release_date.asc',  label: '오래된순' },
  ];

  if (prevKeyword !== keyword) {
    setPrevKeyword(keyword);
    setPage(1);
    setSelectedGenre(null);
  }

  const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page, genreId: selectedGenre, sortBy});
  const { data: genres } = useMovieGenreQuery();

  // keyword 검색 시 클라이언트 사이드 장르 필터링
  const filteredResults = keyword && selectedGenre
    ? data?.results.filter(movie => movie.genre_ids?.includes(selectedGenre))
    : data?.results;

  const handlePageChange = ({selected}) => {
    setPage(selected + 1)
  }

  const handleGenreClick = (genreId) => {
    setSelectedGenre(prev => prev === genreId ? null : genreId);
    setPage(1);
  }

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || '오류가 발생했습니다.');
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className='spinner-area'>
        <ClipLoader size={150} />
      </div>
    );
  }
  if (isError) {
    return (
      <>
        <ToastContainer />
        <div className='error-area'>
          <p>{error?.message || '오류가 발생했습니다.'}</p>
        </div>
      </>
    );
  }
  const isEmpty = filteredResults?.length === 0;

  return (
    <div className={`container ${isEmpty ? 'no-result-container' : ''}`}>
      <div className='content-row'>
        <div className='left'>
          {/* 정렬 */}
          {!keyword && (
            <div className='filter-box sort-box'>
              <h4 className='filter-title'>정렬</h4>
              <ul className='genre-list'>
                {SORT_OPTIONS.map(opt => (
                  <li
                    key={opt.value}
                    className={`genre-item ${sortBy === opt.value ? 'active' : ''}`}
                    onClick={() => { setSortBy(opt.value); setPage(1); }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='filter-box'>
            <h4 className='filter-title'>장르</h4>
            <ul className='genre-list'>
              <li
                className={`genre-item ${selectedGenre === null ? 'active' : ''}`}
                onClick={() => { setSelectedGenre(null); setPage(1); }}
              >
                전체
              </li>
              {genres?.map(genre => (
                <li
                  key={genre.id}
                  className={`genre-item ${selectedGenre === genre.id ? 'active' : ''}`}
                  onClick={() => handleGenreClick(genre.id)}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='right'>
          {isEmpty
            ? <div className='no-result'>
                <p>
                  {keyword
                    ? `"${keyword}"에 대한 검색 결과가 없습니다.`
                    : '해당 장르의 영화가 없습니다.'}
                </p>
              </div>
            : filteredResults?.map((movie, index) => (
                <div className='col' key={index}>
                  <MovieCard movie={movie} />
                </div>
              ))
          }
        </div>
      </div>
      {!isEmpty && (
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={data?.total_pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={page - 1}
        />
      )}
    </div>
  )
}

export default Movie
