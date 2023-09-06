import { useParams } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom"
import ReactModal from 'react-modal'
const baseUrl = process.env.REACT_APP_API_HOST

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const [username, setUsername] = useState('');
  const [watchlistId, setWatchlistId] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useToken();
  let { movie_id } = useParams()
  const movieInt = parseInt(movie_id)
  const postTmdb = {
    "tmdb_movie_id": movieInt
  };


  const fetchMovieData = useCallback(async () => {

    const movieDataUrl = `${baseUrl}/tmdb/movies/details/${movie_id}`;
    const response = await fetch(movieDataUrl);
    if (response.ok) {
      const data = await response.json();
      setMovie(data)

      // 2nd fetch for reviews by movie_id
      const reviewsUrl = `${baseUrl}/reviews/movie/${movie_id}`;
      const reviewsResponse = await fetch(reviewsUrl);
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData)
      }

    } else {
      throw new Error("Failed to retrieve movie data")
    }
  }, [movie_id]);

  useEffect(() => {
    fetchMovieData();
  }, [movie_id, fetchMovieData]);

  useEffect(() => {
    const fetchUsername = async () => {
      const tokenUrl = `${baseUrl}/token`;
      const response = await fetch(tokenUrl, { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setWatchlistId(data.watchlist_id);
        console.log(data.watchlist_id)
        setUsername(data.account.username);
        console.log(data.account.username)
      }
    }
    fetchUsername();
  }, []);

  const submitBtnHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${baseUrl}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, rating, review, movie_id })
      })
      if (response.ok) {
        navigate(`/movies/${movie_id}`)
        // refresh component
        fetchMovieData();
        setReview('');
        setRating('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setIsModalOpen(true);
      }

    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  const handleWatchlistAdd = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${baseUrl}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postTmdb)
      })
      console.log(response)
      if (response.ok) {
        const response = await fetch(`${baseUrl}/users/${username}/watchlist/${watchlistId}?watched=false&movie_id=${movie_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(response)
        if (response.ok) {
          navigate(`/user/${username}/watchlist`)
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error)
    }
  }


  const closeModal = () => {
    setIsModalOpen(false)
    setError('')
  }

  return (
    <div>
      <br />
      <br />
      <br />
      {error && <p>{error}</p>}
      <div>
        <Container className="bg-image fluid">
          <div className="page-content">
            <div className="backdrop-container">
              {movie.backdrop_path ? (
                <div className="backdrop-wrapper">
                  <img className="backdropimage" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="movie backdrop" />
                  <div className="backdropmask" />
                </div>
              ) : null}
            </div>
          </div>
        </Container>
        <Container className="content-container">
          <Row>
            <Col className="text-center">
              <Card>
                {movie.poster_path ? (
                  <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                ) : null}
              </Card>
            </Col>
            <Col>
              <h1>{movie.title}</h1>
              <h3>{movie.release_date}</h3>
              <h5>{movie.overview}</h5>
            </Col>
            <Col className="text-center">
              <Card>
                <Card.Text>{movie.popularity}</Card.Text>
                <Card.Text>{movie.vote_average}</Card.Text>
                <Card.Text>{movie.vote_count}</Card.Text>
                <button className="watchlist-button" onClick={handleWatchlistAdd}><i className="bi bi-eye"></i></button>
              </Card>
            </Col>
          </Row>
          <Row>
            {reviews.map((review) => {
              return (
                <Card key={review.id}>
                  <Card.Text>{review.username}</Card.Text>
                  <Card.Text>{review.rating}</Card.Text>
                  <Card.Text>{review.review}</Card.Text>
                </Card>
              )
            })}
          </Row>
        </Container>
        <Container>
          <Form onSubmit={submitBtnHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Review:</Form.Label>
              <Form.Control type="text" placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} />
              <Form.Text className="text-muted">
                Share your thoughts.
              </Form.Text>
              <Form.Label>Rating:</Form.Label>
              <Form.Control type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
            </Form.Group>
            <Button variant="info" type='submit'>
              Submit
            </Button>
          </Form>
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Review Submission Failed"
            style={{
              overlay: {
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
              }, content: {
                background: '#2D3260',
                top: '300px',
                left: '150px',
                right: '150px',
                bottom: '300px',
                border: '1px solid #ccc',
              }
            }}
          >
            <h2>Review Submission Failed</h2>
            <p>{error}</p>
            <button onClick={closeModal}>Close</button>
          </ReactModal>
        </Container>
      </div>

    </div>

  )

}
