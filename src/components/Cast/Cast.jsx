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
    return (
      <p>There is no information about the cast of this film yet. Sorry...</p>
    );
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
                <img src={imageSRC} alt="foto" width={100} height={200} />
                <p>{name}</p>
                <p>
                  <b> Character:</b> {character}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cast;
