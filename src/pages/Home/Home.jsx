import { useState, useEffect } from "react";

import { getMovieTrend } from "servises/movie-api";
import MovieList from "components/MovieList/MovieList";

const Home = () => {
    const [movieTrand, setMovieTrend] = useState([]);
    const [isLoadind, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const movieTrand = await getMovieTrend();
                setMovieTrend(movieTrand);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <main>
            <h1>Trending today</h1>
            <MovieList trending={movieTrand} loading={isLoadind}
            />
        </main>
    );
};

export default Home;