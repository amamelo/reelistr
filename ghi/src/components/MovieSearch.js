import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import '../css/styles.css'

const baseUrl = process.env.REACT_APP_API_HOST

const Movie = () => {
  const { title } = useParams();
  const [movieData, setMovieData] = useState([]);


  useEffect(() => {
    const fetchMovieDetails = async (title) => {
      const response = await fetch(`${baseUrl}/tmdb/movies/${encodeURIComponent(title)}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error("Failed to fetch movie details");
    };
    fetchMovieDetails(title).then((data) => {
      if (data) {
        setMovieData(data);
      }
    }).catch((error) => {
      console.error("Error fetching movie details:", error);
    });

  }, [title]);


  return (
    <div>
      <h1>Search Results for "{title}"</h1>
      <Container className="p-4" fluid>
        <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
          {movieData.map(movie => {
            return (
              <Col xs='4'>
                <Card className="custom-card">
                  <Link to={'/movies/' + movie.id} >
                    <Card.Img
                      src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div >
  );
};

export default Movie;
