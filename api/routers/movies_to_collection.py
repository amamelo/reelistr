from typing import List
from fastapi import (
    Depends,
    Response,
    APIRouter,
    Request,
)
from routers.authenticator import authenticator

from queries.movies_to_collection import (
    MovieToCollectionOut,
    MovieToCollectionRepo,
    Error
)

router = APIRouter()


@router.post("/users/{username}/collections/{collection_id}",
             response_model=MovieToCollectionOut | Error)
async def add_movie_to_collection(
    username: str,
    movie_id: int,
    collection_id: int,
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MovieToCollectionRepo = Depends(),
):
    return repo.add_movie_to_collection(username, movie_id, collection_id)


# get all movies in collection
@router.get("/users/{username}/collections/{collection_id}",
            response_model=List[MovieToCollectionOut] | Error)
async def get_all_movies_in_collection(
    username: str,
    collection_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MovieToCollectionRepo = Depends(),
) -> List[MovieToCollectionOut]:
    return repo.get_all_movies_in_collection(username, collection_id)


# delete router
@router.delete("/users/{username}/collections/{collection_id}/{movie_id}",
               response_model=bool | Error)
async def delete_movie_from_collection(
    username: str,
    collection_id: int,
    movie_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MovieToCollectionRepo = Depends(),
) -> bool:
    return repo.delete_movie_in_collection(username, collection_id, movie_id)
