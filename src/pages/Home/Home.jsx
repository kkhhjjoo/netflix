import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatingMovieSlide from './components/TopRatingMovieSlide/TopRatingMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'


//1. 배너 => popular영화를 들고와서 첫번째 아이템을 보여주자
//2. popular movie
//3. top rated movie
//4. upcoming movie
const Home = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatingMovieSlide />
      <UpcomingMovieSlide />
    </div>
  )
}

export default Home
