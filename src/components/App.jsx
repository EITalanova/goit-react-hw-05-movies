import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const SharedLayout = lazy(() => import('./SharedLayout/SharedLayout'))
const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'))

export const App = () => {
  return (
    < >
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies/>}/>
        </Route>
      </Routes>
     
    </>
  );
};
