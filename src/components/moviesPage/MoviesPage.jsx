import SearchBar from './searchBar/SearchBar.jsx';
import Movies from './movies/Movies.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MoviesPage() {
    const location = useLocation();

    const searchString = new URLSearchParams(location.search).get('query');

    const navigate = useNavigate();
    const hundleFormSubmit = imageName => {
        navigate(`?query=${imageName}`);
    };
    return (
        <>
            <SearchBar
                onSubmit={hundleFormSubmit}
            />
            {searchString && <Movies movieName={searchString} />}
        </>
    );
}