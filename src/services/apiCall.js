import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async () => {
    const { data } = await axios(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
    return data.results;
};

export const getMoviesDetail = async (id) => {
    const { data } = await axios(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return data;
};

export const getMovieCredits = async (id) => {
    const { data } = await axios(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    return data.cast;
};

export const getSimilarMovies = async (id) => {
    const { data } = await axios(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
    return data.results;
};

export const getMovieVideos = async (id) => {
    try {
        const { data } = await axios(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        return data.results || [];
    } catch (error) {
        return []; 
    }
};

export const getVote = (vote) => {
    if (vote > 8) return "#2ecc71";
    if (vote >= 6) return "#f39c12";
    return "#e74c3c";
};