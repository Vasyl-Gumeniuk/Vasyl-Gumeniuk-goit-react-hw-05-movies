import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import AppBar from './appBar/AppBar.jsx';
import Container from './container/Container.jsx';
import Loader from './loader/Loader.jsx';
import HomePage from './homePage/HomePage.jsx';
import MoviesPage from './moviesPage/MoviesPage.jsx';
import MovieDetailsPage from './movieDetailsPage/MovieDetailsPage.jsx';
import NotFoundView from './notFoundView/NotFoundView.jsx';

export default function App() {
  return (
    <Container>
      <AppBar />
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="search" element={<MoviesPage />} />

          <Route path="search/:moviesId/*" element={<MovieDetailsPage />} />

          <Route path='*' element={<NotFoundView />} />
      </Routes>
      </Suspense>
    </Container>
  );
}
