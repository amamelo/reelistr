import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import Reviews from "../components/Reviews";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom"
import ReactModal from 'react-modal'

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const [username, setUsername] = useState('');
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useToken();
  let { movie_id } = useParams()

  const fetchMovieData = async () => {

    const movieDataUrl = `http://localhost:8000/movies/details/${movie_id}`;
    const response = await fetch(movieDataUrl);
    if (response.ok) {
      const data = await response.json();
      setMovie(data)

      // 2nd fetch for reviews by movie_id
      const reviewsUrl = `http://localhost:8000/reviews/movie/${movie_id}`;
      const reviewsResponse = await fetch(reviewsUrl);
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData)
      }

    } else {
      throw new Error("Failed to retrieve movie data")
    }
  }

  useEffect(() => {
    const fetchMovieData = async () => {

      const movieDataUrl = `http://localhost:8000/movies/details/${movie_id}`;
      const response = await fetch(movieDataUrl);
      if (response.ok) {
        const data = await response.json();
        setMovie(data)

        // 2nd fetch for reviews by movie_id
        const reviewsUrl = `http://localhost:8000/reviews/movie/${movie_id}`;
        const reviewsResponse = await fetch(reviewsUrl);
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData)
        }

      } else {
        throw new Error("Failed to retrieve movie data")
      }
    }
    fetchMovieData();
  }, [movie_id]);

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    const tokenUrl = 'http://localhost:8000/token';
    const response = await fetch(tokenUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setUsername(data.account.username);
    }
  }

  const submitBtnHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, rating, review, movie_id })
      })
      if (response.ok) {
        // const data = await response.json()
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
          <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="movie backdrop" />
        </Container>

        <Container>
          <Row>
            <Col className="text-center">
              <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
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
              </Card>
            </Col>
          </Row>
          <Row>
            `               {reviews.map((review) => {
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
