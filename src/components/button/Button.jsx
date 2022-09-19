import styles from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ name }) {
    return <button className={styles.btn}>{name}</button>;
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
};