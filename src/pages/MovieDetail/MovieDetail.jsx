import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import './MovieDetail.style.css';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

const formatCurrency = (amount) => {
  if (!amount || amount === 0) return '정보 없음';
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '정보 없음';
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const stripLeadingPipe = (value) => {
  if (value == null) return value;
  return String(value).replace(/^\s*\|+\s*/, '');
};

const ScoreCircle = ({ value }) => {
  const n = Number(value);
  const score = Number.isFinite(n) ? Math.round(n * 10) : 0;
  const clamped = Math.min(100, Math.max(0, score));
  const color = clamped >= 70 ? '#21d07a' : clamped >= 50 ? '#d2d531' : '#db2360';
  return (
    <div
      className='score-circle'
      style={{ '--score-color': color }}
      aria-label={`${clamped}%`}
    >
      <svg className='score-circle__svg' viewBox='0 0 56 40' width='52' height='36' aria-hidden>
        <text
          className='score-circle__text'
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          fill={color}
          stroke='none'
          fontSize='18'
          fontWeight='800'
        >
          {`${clamped}%`}
        </text>
      </svg>
    </div>
  );
};

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetailQuery(id);

  if (isLoading) {
    return (
      <div className='detail-spinner'>
        <ClipLoader size={120} color='#e50914' />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className='detail-error'>
        <p>영화 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path ? `${BACKDROP_BASE}${movie.backdrop_path}` : null;
  const posterUrl = movie.poster_path ? `${POSTER_BASE}${movie.poster_path}` : null;

  return (
    <div className='detail-wrapper'>
      {/* 배경 */}
      <div
        className='detail-backdrop'
        style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none' }}
      >
        <div className='detail-backdrop-overlay' />
      </div>

      {/* 메인 콘텐츠 */}
      <div className='detail-content'>
        {/* 포스터 */}
        <div className='detail-poster-wrap'>
          {posterUrl
            ? <img className='detail-poster' src={posterUrl} alt={movie.title} />
            : <div className='detail-poster-placeholder'>No Image</div>
          }
        </div>

        {/* 정보 영역 */}
        <div className='detail-info'>
          <h1 className='detail-title'>
            {movie.title}
            {movie.release_date && (
              <span className='detail-year'> ({movie.release_date.slice(0, 4)})</span>
            )}
          </h1>

          {movie.tagline && (
            <p className='detail-tagline'>"{movie.tagline}"</p>
          )}

          {/* 장르 */}
          <div className='detail-genres'>
            {movie.genres?.map(g => (
              <span key={g.id} className='genre-badge'>{g.name}</span>
            ))}
          </div>

          {/* 평점 + 인기도 */}
          <div className='detail-score-row'>
            <div className='score-block'>
              <span className='score-label'>관객 평점</span>
              <ScoreCircle value={movie.vote_average} />
            </div>
            <div className='popularity-block'>
              <span className='popularity-icon'>🔥</span>
              <div>
                <p className='popularity-label'>인기도</p>
                <p className='popularity-value'>{Math.round(movie.popularity).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* 줄거리 */}
          <div className='detail-section'>
            <h3 className='section-title'>줄거리</h3>
            <p className='detail-overview'>
              {movie.overview || '줄거리 정보가 없습니다.'}
            </p>
          </div>

          {/* 메타 정보 */}
          <div className='detail-meta-grid'>
            <div className='meta-item'>
              <span className='meta-label'>개봉일</span>
              <span className='meta-value'>{stripLeadingPipe(formatDate(movie.release_date))}</span>
            </div>
            <div className='meta-item'>
              <span className='meta-label'>러닝타임</span>
              <span className='meta-value'>
                {stripLeadingPipe(
                  movie.runtime ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분` : '정보 없음'
                )}
              </span>
            </div>
            <div className='meta-item'>
              <span className='meta-label'>예산</span>
              <span className='meta-value'>{stripLeadingPipe(formatCurrency(movie.budget))}</span>
            </div>
            <div className='meta-item'>
              <span className='meta-label'>수익</span>
              <span className='meta-value'>{stripLeadingPipe(formatCurrency(movie.revenue))}</span>
            </div>
            <div className='meta-item'>
              <span className='meta-label'>평점 수</span>
              <span className='meta-value'>{stripLeadingPipe(`${movie.vote_count?.toLocaleString() ?? ''}명`)}</span>
            </div>
            <div className='meta-item'>
              <span className='meta-label'>상태</span>
              <span className='meta-value'>{stripLeadingPipe(movie.status || '정보 없음')}</span>
            </div>
          </div>

          {/* 제작사 */}
          {movie.production_companies?.length > 0 && (
            <div className='detail-section'>
              <h3 className='section-title'>제작사</h3>
              <div className='companies'>
                {movie.production_companies.slice(0, 5).map(c => (
                  <span key={c.id} className='company-badge'>{c.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
