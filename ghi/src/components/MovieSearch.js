import React, { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom"

const Movie = () => {
  const [title, setTitle] = useState("");
  const [movieData, setMovieData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchMovieDetails(title);
      if (response) {
        setMovieData(response);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);

    }
  };

  const fetchMovieDetails = async (title) => {
    const response = await fetch(`http://localhost:8000/movies/${encodeURIComponent(title)}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to fetch movie details");
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <Container className="p-4" fluid>
          <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
            {movieData.map(movie => {
              return (
                <Col xs='4'>
                  <Card key={movie.poster_path} style={{ width: '18rem' }} className="flex-fill">
                    <Card.Header style={{ fontSize: '26px' }}>{movie.title}</Card.Header>
                    <Link to={'/movies/' + movie.movie_id} >
                    <Card.Img variant='top' src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path} alt="Movie Poster" style={{ height: '300px' }} />
                    </Link>
                    <Card.Body>
                      <Card.Text style={{ fontSize: '16px' }}>{movie.overview}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

    </div >
  );
};

export default Movie;

          // <div className="shadow-lg card bg-light mb-3">
          //   <h1 className="card-header">{movie.title}</h1>
          //   <p className="card-body">
          //   {movie.poster_path && <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path} alt="Movie Poster" />}
          //   {movie.overview && <p>{movie.overview}</p>}
          //   </p>
