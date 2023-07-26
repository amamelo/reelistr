from main import app
from fastapi.testclient import TestClient
from queries.reviews import MovieReviewRepo


client = TestClient(app)

#unit test for get all reviews

class EmptyReviewRepository:
    def get_all_reviews(self):
        return [{
            "id": 1,
            "username": "MagicJohnson",
            "movie_id": 1,
            "review": "loved this movie",
            "rating": 5}]

def test_get_all_reviews():
    # Arrange
    app.dependency_overrides[MovieReviewRepo] = EmptyReviewRepository

    # Act
    response = client.get("/reviews")
    print("response", response.json())

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json()[0]["id"] == 1
    assert response.json()[0]["username"] == "MagicJohnson"
    assert response.json()[0]["movie_id"] == 1
    assert response.json()[0]["review"] == "loved this movie"
    assert response.json()[0]["rating"] == 5
