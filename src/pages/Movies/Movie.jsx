import { useEffect, useState } from 'react'
import './Movie.style.css'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
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

  const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page});
  console.log('data', data);
  const handlePageChange = ({selected}) => { 
    setPage(selected + 1)
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
  return (
    <div className='container'>
      <div className='content-row'>
        <div className='left'>필터</div>
        <div className='right'>{data?.results.map((movie, index) => <div className='col' key={index}>
          <MovieCard movie={movie} />
        </div>)}</div>
      </div>
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
        pageCount={data?.total_pages} //전체페이지
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page - 1}
      />
    </div>
  )
}

export default Movie
