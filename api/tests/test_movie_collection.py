from pydantic import BaseModel
from main import app
from fastapi.testclient import TestClient


from routers.authenticator import authenticator
from queries.movie_collection import (
    CollectionRespository,
)

client = TestClient(app)


class EmptyMovieCollection:
    def get_all_collections(self):
        return [{
            "collection_id": 1,
            "username": "Gandalf",
            "collection_name": "best movies"}]


class UserOut(BaseModel):
    username: str
    email: str
    roles: list[str]


def fake_get_current_account_data():
    return UserOut(
        username="Gandalf",
        email="gandalf@email.com",
        roles=["wizard"])


def test_get_all_collections():
    # Arrange
    app.dependency_overrides[CollectionRespository] = EmptyMovieCollection
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data   # noqa

# Act
    response = client.get("/{username}/collections/")
    print("response", response)
    # clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json()[0]["collection_id"] == 1
