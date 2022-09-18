import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Movies.module.css';
import { fetchMoviesByName } from '../../../movieApiService/movieApiService.js';
import Loader from '../../loader/Loader.jsx';

export default function Movies({ movieName }) {
    const [movies, setMovies] = useState(null);
    const [spinner, setSpiner] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            setSpiner(true);
            try {
                const { results } = await fetchMoviesByName(movieName);
                if (results.length <= 0) {
                    throw new Error();
                }
                setMovies(results);
                setSpiner(false);
            } catch (error) {
                toast.info(`Movie with name ${movieName} not found 😢`, {
                    theme: 'colored',
                });
                setSpiner(false);
            }
        };
        fetchMovie();
    }, [movieName]);

    return (
        <>
        {spinner && <Loader />}
        {movies && (
            <ul className={styles.mPageList}>
                    {movies.map(({ original_title, id }) => {
                        return (
                            <li key={id} className={styles.mPageList_item}>
                                <Link
                                    className={styles.mPageList_link}
                                    to={`${id}`}
                                    state={{ pathname: `/search?query=${movieName}` }}
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

Movies.propTypes = {
    movieName: PropTypes.string.isRequired,
};