import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'b6c97f79ccd06825dbbba1fc21aaa7f0';

export const getMovieTrend = async () => {
    const { data } = await axios.get(`trending/all/day?api_key=${API_KEY}`);
    return data.results;
}

export const getSearchMovie = async (query) => {
    const { data } = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`);
    return data;
};

export const getMovieDetails = async (movieId) => {
    const res = await axios.get(`movie/${movieId}?api_key=${API_KEY}`)
        .catch(error => {
            throw new Error('jjjj')
        });
    return res.data;
};

export const getMovieCredits = async (movieId) => {
    const { data } = await axios.get(`movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    return data.cast;
};

export const getMovieReviews = async (id) => {
    const { data } = await axios.get(`movie/${id}/reviews?api_key=${API_KEY}`);
    return data.results;
};

// export default getData;

// https://api.themoviedb.org/3/search/movie?api_key=b6c97f79ccd06825dbbba1fc21aaa7f0&query=batmen