import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'servises/movie-api';

const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

const Cast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cast = await getMovieCredits(movieId);
        setCast(cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  if (!cast) {
    return;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => {
            const imageSRC = profile_path ? IMAGEURL + profile_path : '---';
            return (
              <li key={id}>
                <img src={imageSRC} alt="foto" width={200} height={300} />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
      {!cast.length && (
        <p>There is no information about the cast of this film yet. Sorry...</p>
      )}
    </div>
  );
};

export default Cast;
