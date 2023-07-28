import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';

import '../css/styles.css'
export default function Home() {

  const [upcomingmovies, setUpcomingMovies] = useState([]);
  const [trendingmovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_HOST

    const fetchComingSoon = async () => {
      const response = await fetch(`${baseUrl}/upcoming/`);
      if (response.ok) {
        const data = await response.json();
        setUpcomingMovies(data);
        return data;
      }
      throw new Error("Failed to fetch movie details");
    };
    fetchComingSoon();

    const fetchTrending = async () => {
      const response = await fetch(`${baseUrl}/trending/`);
      if (response.ok) {
        const data = await response.json();
        return setTrendingMovies(data);
      }
      throw new Error("Failed to fetch movie details");
    };

    fetchTrending();
  }, []);

  return (
    <div className="profile-container" >
      <Container className="homepage-container">
        <Row >
          <Col>
          </Col>
          <Col xs={6}>
            <h1>Welcome to reelistr!</h1>
            <h6>your personal movie database</h6>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
      <Container className="profile-container">
        <h1>Upcoming Movies</h1>
        <Container className="media-scroller snaps-inline">
          {upcomingmovies.map((movie) => {
            return (
              <div key={movie.id}>
                <div className="media-element custom-card">
                  {movie.poster_path ? (
                    <Link to={'/movies/' + movie.id}>
                      <Image src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} thumbnail />
                    </Link>
                  ) : null}
                </div>
              </div>
            )
          })}
        </Container>
      </Container >
      <Container className="profile-container">
        <h1>Trending</h1>
        <Container className="media-scroller snaps-inline">
          {trendingmovies.map((movie) => {
            return (
              <div key={movie.id}>
                <div className="media-element">
                  {movie.poster_path ? (
                    <Link to={'/movies/' + movie.id}>
                      <Image src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} thumbnail />
                    </Link>
                  ) : null}
                </div>
              </div>
            )
          })}
        </Container>
      </Container >
    </div >
  );
}
//coming soon
//trending
//recent reviews
