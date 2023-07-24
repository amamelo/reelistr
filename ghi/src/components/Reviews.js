import React, { useEffect, useState } from 'react';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [posterPaths, setPosterPaths] = useState([])

  const fetchReviews = async () => {
    const response = await fetch(`http://localhost:8000/reviews/`);
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
      console.log(data);
      return data;
    }
    throw new Error("Failed to retrieve reviews");
  };

  const fetchMovies = async () => {
    const movieIds = reviews.map(review => review.movie_id);
    const posterPaths = []
    for (const movieId of movieIds) {
      const movieUrl = `http://localhost:8000/movies/details/${movieId}`;
      const movieResponse = await fetch(movieUrl);
      console.log(movieResponse)
      if (movieResponse.ok) {
        const data = await movieResponse.json();
        console.log(data);
        posterPaths.push(data.poster_path)
      }
    }
    setPosterPaths(posterPaths)
    console.log(posterPaths)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await fetchReviews();
        const moviesData = await fetchMovies();
        const sortedReviews = reviewsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setReviews(sortedReviews);
        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      <h2 className='container'>Recent Reviews</h2>
      <div className='container text-center'>
        <div className='row justify-content-center'>
          {reviews.map((review, index) => {
            return (
              <div key={index} className='col-md-6'>
                <div className='card mb-4'>
                  <div className='card-body'>
                    <h5 className='card-title'>{review.username}</h5>
                    <p className='card-text'>Movie ID: {review.movie_id}</p>
                    <img
                      src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${posterPaths[index]}`}
                      alt={`Poster for movie with ID ${review.movie_id}`}
                    />
                    <p className='card-text'>Rating: {review.rating}</p>
                    <p className='card-text'>{review.review}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
