import { React, useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

function TrendingApi() {
  const [movies, setMovies] = useState([]);

  const fetchTrending = async () => {
    const response = await fetch(`http://localhost:8000/trending/`);
    if (response.ok) {
      const data = await response.json();
      return setMovies(data);
    }
    throw new Error("Failed to fetch movie details");
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div>
      <h1>Trending</h1>
      <Container>
        <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
          {movies.map((movie, index) => (
            <Col key={index} xs='4'>
              <Card className="custom-card">
                <Link to={'/movies/' + movie.id} >
                  <Card.Img
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}




export default TrendingApi;
