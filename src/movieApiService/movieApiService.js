const BAZE_URL = 'https://api.themoviedb.org';
const API_KEY = '7840b6820bd4e4b2eef2c5df3c411662';

async function fetchApi(url = '', config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not found'));
}

export function fetchPopular() {
    return fetchApi(`${BAZE_URL}/3/movie/popular?api_key=${API_KEY}`);
}

export function fetchMoviesById(id) {
    return fetchApi(`${BAZE_URL}/3/movie/${id}?api_key=${API_KEY}`);
}

export function fetchCastById(id) {
    return fetchApi(`${BAZE_URL}/3/movie/${id}/credits?api_key=${API_KEY}`);
}

export function fetchReviewById(id) {
    return fetchApi(`${BAZE_URL}/3/movie/${id}/reviews?api_key=${API_KEY}`);
}

export function fetchMoviesByName(name) {
    return fetchApi(`${BAZE_URL}/3/search/movie?api_key=${API_KEY}&page=1&query=${name}`);
}