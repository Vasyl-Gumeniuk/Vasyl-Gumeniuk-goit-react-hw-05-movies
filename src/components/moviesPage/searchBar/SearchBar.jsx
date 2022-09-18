import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Button from '../../button/Button.jsx';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
    const [nameImage, setNameImage] = useState('');

    const handleNameChange = e => {
        setNameImage(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (nameImage.trim() === '') {
            toast.error('введите имя', { theme: 'colored' });
            return;
        }
        onSubmit(nameImage);

        setNameImage('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
                className={styles.searchForm_input}
                type="text"
                value={nameImage}
                onChange={handleNameChange}
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
            />
            <Button name="SEARCH" />
        </form>
    );
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};