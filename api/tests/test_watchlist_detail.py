from main import app
from pydantic import BaseModel
from fastapi.testclient import TestClient

from routers.authenticator import authenticator
from queries.watchlist import MovieWatchlistRepo

client = TestClient(app)


class EmptyMovieWatchlist:
    def get_watchlist_details(self, username: str, watchlist_id: int):
        return [{
            "id": 1,
            "username": "Johnwick",
            "watchlist_id": 1,
            "movie_id": 1,
            "watched": False}]


class UserOut(BaseModel):
    username: str
    email: str
    # roles: list[str]


def test_get_current_account_data():
    assert UserOut(
        username="Johnwick",
        email="wick@email.com"
        # roles=["assassin"]
    )


# unit test for get all watchlists
def test_get_watchlist_detail():
    # Arrange
    app.dependency_overrides[MovieWatchlistRepo] = EmptyMovieWatchlist
    app.dependency_overrides[authenticator.get_current_account_data] = test_get_current_account_data  # noqa: E501

    # Act
    response = client.get("/users/Johnwick/watchlist/1/")
    print("response", response.json())
    # clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json()[0]["id"] == 1
