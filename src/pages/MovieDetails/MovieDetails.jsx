import { useEffect } from "react";
import { useState } from "react"
import { Outlet, useState, useParams, useLocation, useNavigate } from "react-router-dom"

import { getMovieDetails } from "servises/movie-api";

const MovieDetails = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading: true;
            try {
                const movieData = await getMovieDetails(movieId);
                setMovie(movieData);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [movieId]);

    const handleGoBackBtn = () => {
        navigate(location.state.from);
}




}       