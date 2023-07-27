import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function CollectionDetail() {

    const [movies, setMovies] = useState([]);
    const [username, setUsername] = useState('');
    // const [collectionId, setCollectionId] = useState('');
    // const [collectionName, setCollectionName] = useState('');
    const [posterPaths, setPosterPaths] = useState([])
    const { collection_id } = useParams();
    const { token } = useToken();
    console.log(token)

    const fetchUsername = async () => {
        const tokenUrl = 'http://localhost:8000/token';
        const response = await fetch(tokenUrl, { credentials: "include" });
        if (response.ok) {
            const data = await response.json();
            // console.log("data:", data)
            setUsername(data.account.username);
        }
    }
    console.log("username:", username)

    // const fetchMovies = async () => {
    //     console.log("username:", username)
    //     const moviesUrl = `http://localhost:8000/users/${username}/collections/${collection_id}`;
    //     const response = await fetch(moviesUrl, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data)
    //         setMovies(data)

    //         const movieIds = data.map(movie => movie.movie_id);
    //         console.log(movieIds)

    //         // fetch movie details for each movie
    //         const posterPaths = []
    //         for (const movieId of movieIds) {
    //             const movieUrl = `http://localhost:8000/movies/details/${movieId}`;
    //             const movieResponse = await fetch(movieUrl);
    //             if (movieResponse.ok) {
    //                 const data = await movieResponse.json();
    //                 posterPaths.push(data.poster_path)
    //             }
    //         }
    //         setPosterPaths(posterPaths)
    //     } else {
    //         throw new Error("Failed to retrieve movies watched")
    //     }

    // }

    useEffect(() => {
        if (token && username) {
            const fetchMovies = async () => {
                const moviesUrl = `http://localhost:8000/users/${username}/collections/${collection_id}`;
                const response = await fetch(moviesUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setMovies(data)

                    const movieIds = data.map(movie => movie.movie_id);
                    console.log(movieIds)

                    // fetch movie details for each movie
                    const posterPaths = []
                    for (const movieId of movieIds) {
                        const movieUrl = `http://localhost:8000/tmdb/movies/details/${movieId}`;
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
        <div>
            <br />
            <br />
            <br />
            {/* <h1>{collectionName}</h1> */}
            <h1>HELLO</h1>
            <Container className="p-4">
                <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
                    {movies.map((movie, index) => {
                        return (
                            <Col key={movie.id} xs='4'>
                                <Card style={{ width: '80%', height: '80%' }} className="flex-fill">
                                    <a href={'http://localhost:3000/movies/' + movie.movie_id}>
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
