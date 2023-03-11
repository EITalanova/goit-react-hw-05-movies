import Notiflix from 'notiflix';

import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { getSearchMovie } from 'servises/movie-api';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movie"
          placeholder="Enter the movie..."
          autoComplete="off"
          color="secondary"
          defaultValue={movieName}
        />
        <button type="submit" variant="outlined" color="secondary" size="small">
          Search
        </button>
      </form>
      <>
        {isLoadind && <div>Loading...</div>}
        {movieName && (
          <ul>
            {movies.map(({ id, title, name }) => (
              <li key={id}>
                <Link to={`${id}`} state={{ from: fullPath }}>
                  {title || name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    </div>
  );
};

export default Movies;
