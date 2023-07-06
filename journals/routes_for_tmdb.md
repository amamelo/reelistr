@app.get("/movies/{title}")
def get_movie_details(title: str):
    tmdb_api_key = "c44a2f159bdbba605eacc243b547c826"
    tmdb_url = f"https://api.themoviedb.org/3/search/movie?api_key={tmdb_api_key}&query={title}"

    response = requests.get(tmdb_url)
    if response.status_code == 200:
        movie_results = response.json().get("results", [])
        return movie_results
    else:
        return {"error": "Failed to fetch movie details"}
