from pydantic import BaseModel
from api.main import app
from fastapi import TestClient


from api.routers.authenticator import authenticator
from api.queries.movie_collection import (
    CollectionOut,
)


class UserOut(BaseModel):
    username: str
    email: str
    roles: list[str]


def fake_get_current_account_data():
    return UserOut(
        username="Gandalf",
        email="gandalf@email.com",
        roles=["wizard"])


def test_get_one_collection():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data   # noqa

    # Act
    client = TestClient
    response = client.get("/user/collections/{collection_id}")

    # clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == CollectionOut(
        collection_id=int,
        username=str,
        collection_name=str)
