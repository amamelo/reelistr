import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [posterPaths, setPosterPaths] = useState([])

  const fetchReviews = async () => {
    const response = await fetch(`http://localhost:8000/reviews/`);
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
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
      if (movieResponse.ok) {
        const data = await movieResponse.json();
        posterPaths.push(data.poster_path)
      }
    }
    setPosterPaths(posterPaths)
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  useEffect(() => {
    fetchMovies();
  }, [reviews]);

  return (
    <div>
      <h1>Reviews</h1>
      <h2 className='container'>Recent Reviews</h2>
      <div className='container'>
        {reviews.map((review, index) => {
          return (
            <div key={index} className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card mb-4'>
                  <div className='row g-0'>
                    {/* Left half for the image */}
                    <div className='col-md-6'>
                      {posterPaths[index] ? (
                        <img
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${posterPaths[index]}`}
                          alt={`Poster for movie with ID ${review.movie_id}`}
                        />
                      ) : null}
                    </div>
                    {/* Right half for other details */}
                    <div className='col-md-6'>
                      <div className='card-body'>
                        <h5 className='card-title'>{review.username}</h5>
                        <p className='card-text'>Rating: {review.rating}</p>
                        <p className='card-text'>" {review.review} "</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Reviews;
