import { useState } from 'react';

import { getMovieReviews } from "servises/movie-api";

const [isLoading, setIsLoading] = useState(false);
const [reviews, setReviews] = useState(null);

const fetchData = async () => {
    const reviews = await getMovieReviews();
}