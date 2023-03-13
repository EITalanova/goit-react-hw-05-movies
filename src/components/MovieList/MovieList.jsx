import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './MovieList.module.css';

const MovieList = ({ trending, loading }) => {
  const location = useLocation();

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {trending.map(({ id, title, name }) => (
            <li className={style.item} key={id}>
              <Link to={`movies/${id}`} state={{ from: location.pathname }}>
                {title || name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieList;

MovieList.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};
