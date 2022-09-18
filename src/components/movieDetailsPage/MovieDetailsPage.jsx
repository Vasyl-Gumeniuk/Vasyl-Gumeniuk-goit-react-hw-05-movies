import { useState, useEffect, lazy, Suspense } from 'react';
import { fetchMoviesById } from '../../movieApiService/movieApiService.js';
import iconNotFound from '../../img/no-pictures.png';
import Loader from '../loader/Loader.jsx';
import {
  useParams,
  NavLink,
  Route,
  Routes,
  useLocation,
  Link,
} from 'react-router-dom';
import Button from '../button/Button.jsx';
import styles from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('./cast/Cast.jsx'));
const Reviews = lazy(() => import('./reviews/Revievs.jsx'));

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetchMoviesById(moviesId).then(setMovie);
  }, [moviesId]);

  const location = useLocation();

  return (
    <>
      <Link className={styles.link_back} to={location.state}>
        <Button name="< GO BACK" />
      </Link>
      {movie && (
        <div className={styles.main_wrap}>
          <img
            src={
              movie.poster_path
                ? BASE_POSTER_URL + movie.poster_path
                : iconNotFound
            }
            alt={movie.original_title}
          />
          <div className={styles.right_container}>
            <h2>
              {movie.original_title}
              <span className="movie-item__year">
                ({movie.release_date.substr(0, 4)})
              </span>
            </h2>
            <p>User Score : {movie.vote_average * 10 + '%'} </p>
            <p className={styles.movie_item__subtitle_text}>Overview</p>
            <p>{movie.overview}</p>
            <p className={styles.movie_item__subtitle_text}>Genres</p>
            {movie.genres.map(({ name }) => {
              return (
                <span className={styles.genres_span} key={name}>
                  {name}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <div className={styles.aditional_wrap}>
        <p className={styles.aditional__title_text}>Additional information</p>
        <ul className={styles.aditional_list}>
          <li className={styles.aditional_list__item}>
            <NavLink
              className={styles.aditional_list__item_link}
              to={'cast'}
              state={location.state}
            >
              Cast
            </NavLink>
          </li>
          <li className={styles.aditional_list__item}>
            <NavLink
              className={styles.aditional_list__item_link}
              to={'reviews'}
              state={location.state}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='reviews' element={<Reviews idFilm={moviesId} />}></Route>
          <Route path='cast' element={<Cast idFilm={moviesId} />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}