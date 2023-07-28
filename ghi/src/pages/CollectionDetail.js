import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import useToken from "@galvanize-inc/jwtdown-for-react";
const baseUrl = process.env.REACT_APP_API_HOST

export default function CollectionDetail() {

    const [movies, setMovies] = useState([]);
    const [username, setUsername] = useState('');
    const [posterPaths, setPosterPaths] = useState([])
    const { collection_id } = useParams();
    const { token } = useToken();

    const fetchUsername = async () => {
        const tokenUrl = `${baseUrl}/token`;
        const response = await fetch(tokenUrl, { credentials: "include" });
        if (response.ok) {
            const data = await response.json();
            setUsername(data.account.username);
        }
    }


    useEffect(() => {
        if (token && username) {
            const fetchMovies = async () => {
                const moviesUrl = `${baseUrl}/users/${username}/collections/${collection_id}`;
                const response = await fetch(moviesUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMovies(data)

                    const movieIds = data.map(movie => movie.movie_id);

                    const posterPaths = []
                    for (const movieId of movieIds) {
                        const movieUrl = `${baseUrl}/tmdb/movies/details/${movieId}`;
                        const movieResponse = await fetch(movieUrl);
                        if (movieResponse.ok) {
                            const data = await movieResponse.json();
                            posterPaths.push(data.poster_path)
                        }
                    }
                    setPosterPaths(posterPaths)
                } else {
                    throw new Error("Failed to retrieve movies watched")
                }

            }
            fetchMovies();
        }
    }, [token, username, collection_id]);

    useEffect(() => {
        fetchUsername();
    }, []);

    return (
        <div className="profile-container">
            <Container className="user-container">
                <Row>
                    <Col>
                    </Col>
                    <Col xs={6}>
                        <h1>your reelistr collection</h1>
                        <Link to="/addmovie"><button>+ Add Movie</button></Link>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
                    {movies.map((movie, index) => {
                        return (
                            <Col key={movie.id} xs='4'>
                                <Card className="flex-fill custom-card">
                                    <a href={'/movies/' + movie.movie_id}>
                                        <Card.Img variant='top' src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${posterPaths[index]}`}
                                            alt={movie.title}
                                        />
                                    </a>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    )
};
