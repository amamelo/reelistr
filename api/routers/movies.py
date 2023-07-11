from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import requests
import os

API_KEY = os.environ['FAST_API_TMDB_API_KEY']

router=APIRouter()

class MovieOut(BaseModel):
    title: str
    overview: str
    poster_path: str
    release_date: str
    poster_path: Optional[str]


@router.get("/movies/{movie_name}", response_model=List[MovieOut])
def get_from_tmdb(movie_name: str) -> List[MovieOut]:
    encoded_movie_name = requests.utils.quote(movie_name)
    tmdb_url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={encoded_movie_name}"

    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
            return movie_details
    return None

@router.get("/movies/omdb/{movie_name}")
def get_from_omdb(movie_name: str) -> dict:
    omdb_api_key = "3b11de2"
    omdb_url = f"http://www.omdbapi.com/?apikey={omdb_api_key}&s={movie_name}"
    response = requests.get(omdb_url)
    print(response)
    if response.status_code == 200:
        movie_details = response.json()
        print(movie_details)
        if movie_details.get("Response") == "True":
            return movie_details
    return None
