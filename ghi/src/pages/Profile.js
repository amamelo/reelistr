import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import useToken from "@galvanize-inc/jwtdown-for-react";
import reelistr_logo from './reelistr_logo.png';
import Image from 'react-bootstrap/Image';

// import WatchlistScroller from "../components/watchlist_media_scroller";
import '../css/styles.css'

export default function Profile() {

    const [username, setUserName] = useState("")
    const [useremail, setUserEmail] = useState("")
    const [watchlist_id, setWatchlistId] = useState('');
    const [posterPaths, setPosterPaths] = useState([])
    const [movies, setMovies] = useState([]);
    const [collections, setCollections] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewsposterPaths, setReviewPosterPaths] = useState([]);
    const [rating, setRating] = useState('');
    const { token } = useToken();

    // const fetchUserInfo = async () => {
    //     const tokenUrl = 'http://localhost:8000/token';
    //     const response = await fetch(tokenUrl, { credentials: "include" });
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data)
    //         setUserName(data.account.username)
    //         setWatchlistId(data.watchlist_id)
    //         setUserEmail(data.account.email)
    //     }
    // }

    // const fetchMovies = async () => {
    //     const watchlistUrl = `http://localhost:8000/users/${username}/watchlist/${watchlist_id}/`;
    //     const response = await fetch(watchlistUrl, { headers: { Authorization: `Bearer ${token}` }, })
    //     if (response.ok) {
    //         const data = await response.json();
    //         setMovies(data)

    //         // extract movie IDs
    //         const movieIds = data.map(movie => movie.movie_id);

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
    // };

    // const fetchCollections = async () => {
    //     const collectionsUrl = `http://localhost:8000/${username}/collections/`;
    //     const response = await fetch(collectionsUrl, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         setCollections(data);

    //     } else {
    //         throw new Error("Failed to retrieve collections")
    //     }
    // }

    // const fetchUserReviews = async () => {
    //     const reviewsUrl = `http://localhost:8000/reviews/user/${username}`;
    //     const reviewsResponse = await fetch(reviewsUrl);
    //     if (reviewsResponse.ok) {
    //         const reviewsData = await reviewsResponse.json();
    //         setReviews(reviewsData)
    //         setRating(reviewsData.rating)

    //         const movieIds = reviews.map(review => review.movie_id);
    //         // fetch movie details for each movie in review
    //         const reviewposterPaths = []
    //         for (const movieId of movieIds) {
    //             const movieUrl = `http://localhost:8000/movies/details/${movieId}`;
    //             const movieResponse = await fetch(movieUrl);
    //             if (movieResponse.ok) {
    //                 const data = await movieResponse.json();
    //                 reviewposterPaths.push(data.poster_path)
    //             }
    //         }
    //         setReviewPosterPaths(reviewposterPaths)
    //     } else {
    //         throw new Error("Failed to retrieve user reviews")
    //     }
    // };


    useEffect(() => {
        const fetchUserInfo = async () => {
            const tokenUrl = 'http://localhost:8000/token';
            const response = await fetch(tokenUrl, { credentials: "include" });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUserName(data.account.username)
                setWatchlistId(data.watchlist_id)
                setUserEmail(data.account.email)
            }
        }
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (token && username) {
            const fetchCollections = async () => {
                const collectionsUrl = `http://localhost:8000/${username}/collections/`;
                const response = await fetch(collectionsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCollections(data);

                } else {
                    throw new Error("Failed to retrieve collections")
                }
            }

            const fetchMovies = async () => {
                const watchlistUrl = `http://localhost:8000/users/${username}/watchlist/${watchlist_id}/`;
                const response = await fetch(watchlistUrl, { headers: { Authorization: `Bearer ${token}` }, })
                if (response.ok) {
                    const data = await response.json();
                    setMovies(data)

                    // extract movie IDs
                    const movieIds = data.map(movie => movie.movie_id);
                    console.log("movieIds:+++++++++++++++++++++++++++", movieIds)

                    // fetch movie details for each movie
                    const posterPathsArray = []
                    for (const movieId of movieIds) {
                        const movieUrl = `http://localhost:8000/movies/details/${movieId}`;
                        const movieResponse = await fetch(movieUrl);
                        if (movieResponse.ok) {
                            const data = await movieResponse.json();
                            posterPathsArray.push(data.poster_path)
                        }
                    }
                    setPosterPaths(posterPathsArray)
                } else {
                    throw new Error("Failed to retrieve movies watched")
                }
            };
            fetchCollections();
            fetchMovies();
        }
    }, [username, token, watchlist_id]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            const reviewsUrl = `http://localhost:8000/reviews/user/${username}`;
            const reviewsResponse = await fetch(reviewsUrl);
            if (reviewsResponse.ok) {
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData)
                setRating(reviewsData.rating)


            } else {
                throw new Error("Failed to retrieve user reviews")
            }
        };
        fetchUserReviews();
    }, [username, token]);

    useEffect(() => {
        const reviewPosterFetch = async () => {
        const movieIds = reviews.map(review => review.movie_id);
        // fetch movie details for each movie in review
        const reviewposterPathsArray = []
        for (const movieId of movieIds) {
            const movieUrl = `http://localhost:8000/movies/details/${movieId}`;
            const movieResponse = await fetch(movieUrl);
            if (movieResponse.ok) {
                const data = await movieResponse.json();
                reviewposterPathsArray.push(data.poster_path)
            }
        }
        setReviewPosterPaths(reviewposterPathsArray)
    }
        if (reviews) {
            reviewPosterFetch()
    }
    }, [reviews])

    return (
        <div className="profile-container">
            <Container className="user-container">
                <Row>
                    <Col xs={2} md={2}>
                        <Image className="profile-image" src={reelistr_logo} rounded />
                    </Col>
                    <Col>
                        <h1>Welcome to your reelistr, {username}</h1>
                        <h4>{useremail}</h4>
                    </Col>
                </Row>
            </Container>
            <Container className="profile-container">
                <Link to="/watchlist" className="profile-link">
                    <h1>Watchlist</h1>
                </Link>
                <Container className="media-scroller snaps-inline">
                    {movies.map((movie, index) => {
                        return (
                            <div key={movie.id}>
                                <div className="media-element">
                                    {posterPaths[index] ? (
                                        <Link to={'/movies/' + movie.movie_id}>
                                            <Image src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${posterPaths[index]}`} thumbnail />
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}
                </Container>
            </Container >
            <Container className="profile-container">
                <Link to="/user/collections" className="profile-link" >
                    <h1>My Movie Collections</h1>
                </Link>
                <Container className="media-scroller snaps-inline">
                    {collections.map((collection) => {
                        return (
                            <div key={collection.id}>
                                <div className="media-element">
                                    <Image src={reelistr_logo} thumbnail />
                                    <p className="title">{collection.collection_name}</p>
                                </div>
                            </div>
                        )
                    })}
                </Container>
            </Container >
            <Container className="profile-container">
                <h1>My Reviews</h1>
                <Row>
                    {reviews.map((review, index) => {
                        return (
                            <div key={review.id} className="review-card" style={{ maxWidth: '540px' }}>
                                <div className="row g-0">
                                    <div className="col-md-4 ">
                                        {posterPaths[index] ? (
                                            <img
                                                className="img-fluid rounded-start"
                                                style={{ aspectRatio: '2/3', objectFit: 'cover', height: '200px' }}
                                                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${reviewsposterPaths[index]}`}
                                                alt={`Poster for movie with ID ${review.movie_id}`} />
                                        ) : null}
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body ">
                                            <h5 className="card-title">{review.username}</h5>
                                            <p className="card-text">{review.rating}{rating}</p>
                                            <p className="card-text">{review.review}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Row>
            </Container>
        </div >
    )
};
