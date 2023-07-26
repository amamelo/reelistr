from pydantic import BaseModel # noqa
from main import app
from fastapi.testclient import TestClient
from queries.movie_add import (
    MovieRepository
)

client = TestClient(app)


class EmptyMovieReturn:
    def get_movie_from_db(self, id: int):
        # if id = 1, return thing below
        if id == 1:
            return {
                "id": 1,
                "tmdb_movie_id": 767
            }
        # else return None maybe
        else:
            return None


class MovieOut(BaseModel):
    id: int
    tmdb_movie_id: int


def test_get_movie_from_db():
    app.dependency_overrides[MovieRepository] = EmptyMovieReturn

    id = 1

    response = client.get(f"/movies/{id}")

    assert response.status_code == 200

    assert response.json()['id'] == id


def test_get_invalid_movie_from_db():
    movie_id = 999999

    response = client.get(f"/movies/{movie_id}")
    print(response)

    assert response.status_code == 404
