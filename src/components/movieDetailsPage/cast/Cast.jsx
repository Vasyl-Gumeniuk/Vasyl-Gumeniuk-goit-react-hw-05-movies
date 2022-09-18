import { useState, useEffect } from 'react';
import { fetchCastById } from '../../../movieApiService/movieApiService.js';
import iconNotFound from '../../../img/no-pictures.png';
import styles from './Cast.module.css';
import PropTypes from 'prop-types';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

export default function Cast({ idFilm }) {
    const [actors, setActors] = useState([]);
    useEffect(() => {
        fetchCastById(idFilm)
            .then(rev => rev.cast)
            .then(setActors);
    }, [idFilm]);
    return (
        <>
            {actors && (
                <ul>
                    {actors.map(({ original_name, profile_path, character }, index) => {
                        return (
                            <li key={index}>
                                <img
                                    src={
                                        profile_path ? BASE_POSTER_URL + profile_path : iconNotFound
                                    }
                                    alt={original_name}
                                    className={styles.item_cast__image_cast}
                                />
                                <p className={styles.item_cast__original_name}>{original_name}</p>
                                <p>Character: {character}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

Cast.propTypes = {
    idFilm: PropTypes.string.isRequired,
};