import { useState, useEffect } from 'react';

import { getMovieTrend } from 'servises/movie-api';
import MovieList from 'components/MovieList/MovieList';

import style from './Home.module.css';

const Home = () => {
  const [movieTrand, setMovieTrend] = useState([]);
  const [isLoadind, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movieTrand = await getMovieTrend();
        setMovieTrend(movieTrand);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={style.mainContainer}>
      <h1 className={style.title}>Trending today</h1>
      <MovieList trending={movieTrand} loading={isLoadind} />
    </main>
  );
};

export default Home;
