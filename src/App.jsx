import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import Home from './pages/Home/Home'
// import Movie from './pages/Movies/Movie'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Tv from './pages/Tv/Tv'
import TvDetail from './pages/TvDetail/TvDetail'
import NotFound from './pages/NotFound/NotFound'
import { lazy } from 'react'


const Movie = lazy(() => import('./pages/Movies/Movie'));
//홈페이지 /
//영화 전체 보여주는 페이지(서치) /movies?q=asdf 
//영화 디테일 페이지 /movies/:id
//추천영화 /movies/:id/recommendation
//리뷰 /movies/:id/reviews
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route index="true" element={<Home />} />
          <Route path="movies">
            <Route index element={<Movie />} />
            <Route path=":id" element={<MovieDetail />} />
          </Route>
          <Route path="tv">
            <Route index element={<Tv /> } />
            <Route path=":id" element={<TvDetail /> } />
          </Route>
        </Route>  
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
