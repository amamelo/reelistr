from fastapi import APIRouter
import requests

router=APIRouter()

@router.get("/movies/{movie_name}")
def get_from_tmdb(movie_name: str) -> dict:
    tmdb_api_key = "c44a2f159bdbba605eacc243b547c826"
    encoded_movie_name = requests.utils.quote(movie_name)
    tmdb_url = f"https://api.themoviedb.org/3/search/movie?api_key={tmdb_api_key}&query={encoded_movie_name}"

    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results'][0]
            return movie_details
    return None

@router.get("/movies/omdb/{movie_name}")
def get_from_omdb(movie_name: str) -> dict:
    omdb_api_key = "3b11de2"
    omdb_url = f"http://www.omdbapi.com/?apikey={omdb_api_key}&t={movie_name}"
    response = requests.get(omdb_url)
    if response.status_code == 200:
        movie_details = response.json()
        if movie_details.get("Response") == "True":
            return movie_details
    return None
