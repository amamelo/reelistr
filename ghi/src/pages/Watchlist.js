import { React, useEffect, useState, useCallback } from "react";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from 'react-router-dom';

export default function Watchlist() {
    const [movies, setMovies] = useState([]);
    const [username, setUsername] = useState('');
    const [watchlist_id, setWatchlistId] = useState('');
    const [posterPaths, setPosterPaths] = useState([])
    const { token } = useToken();
    const baseUrl = process.env.REACT_APP_API_HOST


    const fetchMovies = useCallback(async () => {
        const watchlistUrl = `${baseUrl}/users/${username}/watchlist/${watchlist_id}/`;
        const response = await fetch(watchlistUrl, { headers: { Authorization: `Bearer ${token}` }, })
        if (response.ok) {
            const data = await response.json();
            setMovies(data)


            // extract movie IDs
            const movieIds = data.map(movie => movie.movie_id);

            // fetch movie details for each movie
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
    }, [username, watchlist_id, token, baseUrl]);

    useEffect(() => {
        if (username) {
            fetchMovies();
        }
    }, [username, watchlist_id, token, fetchMovies]);

    useEffect(() => {
        const fetchUsername = async () => {
            const tokenUrl = `${baseUrl}/token`;
            const response = await fetch(tokenUrl, { credentials: "include" });
            if (response.ok) {
                const data = await response.json();
                setUsername(data.account.username);
                setWatchlistId(data.watchlist_id)
            }
        }
        fetchUsername();
    }, [baseUrl]);

    return (
        <div>
            <br />
            <br />
            <br />
            <h1>Watchlist</h1>
            <Container className="p-4">
                <Row xs={1} md={3} lg={4} className="g-3 justify-content-md-center">
                    {movies.map((movie, index) => {
                        return (
                            <Col key={movie.id} xs='4'>
                                <Card style={{ width: '80%', height: '80%' }} className="flex-fill">
                                    <Link to={'/movies/' + movie.movie_id}>
                                        <Card.Img variant='top' src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${posterPaths[index]}`}
                                            alt={movie.title}
                                        />
                                    </Link>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    )

};
