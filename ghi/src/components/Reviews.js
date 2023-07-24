import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const response = await fetch(`http://localhost:8000/reviews`);
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
      return data;
    }
    throw new Error("Failed to retrieve reviews");
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      <Container className="p-4">
        <Row xs={1} md={1} lg={1} className="g-3 justify-content-md-center">
          {reviews.map(review => {
            return (
              <Col xs='4'>
                <Card key={review.id} style={{ width: '600px', height: '300px' }} className="flex-fill">
                  <Card.Body>
                    <Card.Text>{review.username}</Card.Text>
                    <Card.Text>{review.review}</Card.Text>
                    <Card.Text>{review.rating}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Reviews;
