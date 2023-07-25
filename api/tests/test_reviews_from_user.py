from starlette.testclient import TestClient
from main import app
import pytest

client = TestClient(app)


def test_get_reviews_by_user():
    test_username = "santaclaus"
    response = client.get(f"/reviews/user/{test_username}")

    assert response.status_code == 200
    assert isinstance(response.json(), list)

    for review in response.json():
        assert "id" in review
        assert "username" in review
        assert "movie_id" in review
        assert "review" in review
        assert "rating" in review
        assert review["username"] == test_username
