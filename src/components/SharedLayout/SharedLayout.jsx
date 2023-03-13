import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import style from './SharedLayout.module.css'

const SharedLayout = () => {
  return (
    <div className={style.section}>
      <header className={style.container}>
        <NavLink className={style.link} to="/">Home</NavLink>
        <NavLink  className={style.link} to="/movies">Movies</NavLink>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
