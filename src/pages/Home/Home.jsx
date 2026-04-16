import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatingMovieSlide from './components/TopRatingMovieSlide/TopRatingMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'
import { Suspense } from 'react';
import { ClipLoader } from "react-spinners";


//1. 배너 => popular영화를 들고와서 첫번째 아이템을 보여주자
//2. popular movie
//3. top rated movie
//4. upcoming movie
const Home = () => {
  return (
    <div>
      {/* <ErrorBoundary fallback={<ErrorMessage error={error} />}> */}
        <Suspense fallback={<ClipLoader
          size={150} color='#e50914'
        />}>
          <Banner />
          <PopularMovieSlide />
          <TopRatingMovieSlide />
          <UpcomingMovieSlide />
        </Suspense>
      {/* </ErrorBoundary> */}
    </div>
  )
}

export default Home
