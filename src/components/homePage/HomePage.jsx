import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPopular } from '../../movieApiService/movieApiService.js';
import styles from './HomePage.module.css';
import Loader from '../loader/Loader.jsx';

export default function HomePage() {
    const [movies, setMovies] = useState(null);
    const [spinner, setSpiner] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setSpiner(true);
        fetchPopular()
            .then(films => films.results)
            .then(setMovies);
        setSpiner(false);
    }, []);

    return (
        <>
            <h1>Tranding today</h1>
            {spinner && <Loader />}
            {movies && (
                <ul className={styles.hPageList}>
                    {movies.map(({ original_title, id }) => {
                        return (
                            <li key={id} className={styles.hPageList_item}>
                                <Link
                                    className={styles.hPageList_link}
                                    to={`search/${id}`}
                                    state={location}
                                >
                                    {original_title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
