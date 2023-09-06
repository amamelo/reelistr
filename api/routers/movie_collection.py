from fastapi import APIRouter, Depends, Response
from typing import List, Optional
from queries.movie_collection import (
    CollectionIn,
    CollectionOut,
    CollectionRespository
)
from routers.authenticator import authenticator

router = APIRouter()


@router.post("/user/{user_id}/collections", response_model=CollectionOut)
def create_collection(
    user_id: str,
    collection: CollectionIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CollectionRespository = Depends(),
):
    return repo.create_collection(collection, user_id)


@router.get("/user/collections/{collection_id}",
            response_model=Optional[CollectionOut])
def get_one_collection(
    collection_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CollectionRespository = Depends(),
) -> CollectionOut:
    collection = repo.get_one_collection(collection_id)
    if collection is None:
        response.status_code = 404
    return collection


@router.put("/user/collections/{collection_id}",
            response_model=CollectionOut)
def update_collection(
    collection_id: int,
    collection: CollectionIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CollectionRespository = Depends(),
) -> CollectionOut:
    return repo.update_collection(collection_id, collection)


@router.delete("/user/collections/{collection_id}", response_model=bool)
def delete_collection(
    collection_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CollectionRespository = Depends(),
) -> bool:
    return repo.delete_collection(collection_id)


@router.get("/user/{username}/collections", response_model=List[CollectionOut])
def get_all_collections(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CollectionRespository = Depends(),
):
    return repo.get_all_collections(username)
