import Notiflix from 'notiflix';

import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { getSearchMovie } from 'servises/movie-api';

import style from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadind, setIsLoading] = useState(false);
  const location = useLocation();
  const fullPath = location.pathname + location.search;
  const movieName = searchParams.get('query');

  const handleSubmit = e => {
    e.preventDefault();

    const query = e.target.movie.value;
    if (!query) {
      Notiflix.Notify.failure('Enter please a movie name');
    }
    setSearchParams(query !== '' ? { query } : {});
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!movieName) {
        return;
      }
      setIsLoading(true);
      try {
        const movies = await getSearchMovie(movieName);
        setMovies(movies.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieName]);

  return (
    <div className={style.section}>
      <form onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          name="movie"
          placeholder="Enter the movie..."
          autoComplete="off"
          color="secondary"
          defaultValue={movieName}
        />
        <button
          className={style.btn}
          type="submit"
          variant="outlined"
          color="secondary"
          size="small"
        >
          Search
        </button>
      </form>
      <>
        {isLoadind && <div>Loading...</div>}
        {movieName && (
          <ul>
            {movies.map(({ id, title, name }) => (
              <li className={style.item} key={id}>
                <Link to={`${id}`} state={{ from: fullPath }}>
                  {title || name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!movies.length && movieName && <div>Nothing found!</div>}
      </>
    </div>
  );
};

export default Movies;
