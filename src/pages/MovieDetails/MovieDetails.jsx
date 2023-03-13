import { useEffect, useState, Suspense } from 'react';
import {
  Outlet,
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Link,
} from 'react-router-dom';

import { getMovieDetails } from 'servises/movie-api';

import style from './MovieDetails.module.css';

const IMAGEURL = 'https://image.tmdb.org/t/p/w500/';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const handleGoBackBtn = () => {
    navigate(location.state.from);
  };

  if (!movie) {
    return;
  }
  const { genres, title, release_date, overview, vote_average, poster_path } =
    movie;
  const imageSRC = poster_path ? IMAGEURL + poster_path : '-------';
  const userScore = Math.round((Number(vote_average) * 100) / 10);
  const movieGenres = genres.map(genre => genre.name).join(' ');
  const releaseDate = release_date.slice(0, 4);

  return (
    <>
      <section className={style.container}>
        {location.state?.from && (
          <button className={style.btn} onClick={handleGoBackBtn}>
            <span>Go back</span>
          </button>
        )}
        {isLoading ? (
          <div className={style.img}>Loading...</div>
        ) : (
          <Link className={style.box}>
            <div>
              <img src={`${imageSRC}`} alt={title} width={300} height={200} />
            </div>

            <div className={style.description}>
              <h2 className={style.title}>
                {title} {releaseDate && `(${releaseDate})`}
              </h2>
              <ul>
                <li>
                  {userScore > 0 && (
                    <p>
                      <b>User score:</b> {userScore}%
                    </p>
                  )}
                </li>
                <li>
                  <b>Overwiew</b>
                  <p>{overview}</p>
                </li>
                <li>
                  <b>Genres</b>
                  <p>{movieGenres || '-'}</p>
                </li>
              </ul>
            </div>
          </Link>
        )}
      </section>
      <div className={style.container}>
        <h3 className={style.title}>Additional information</h3>
        <div>
          <ul>
            <li className={style.item}>
              <NavLink to="cast" state={location.state}>
                Cast
              </NavLink>
            </li>
            <li className={style.item}>
              <NavLink to="reviews" state={location.state}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>

        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetails;
