import React, { useState } from "react";

const Movie = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [plot, setPlot] = useState("");
  const [movieData, setMovieData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchMovieDetails(title);
      console.log(response);
      debugger //response.results for TMDB
      if (response.results) {
        setMovieData(response.results);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setPoster("");
      setPlot("");
    }
  };

  const fetchMovieDetails = async (title) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c44a2f159bdbba605eacc243b547c826&query=${encodeURIComponent(title)}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
    throw new Error("Failed to fetch movie details");
  };

  return (
    <div>
      <h1>Movie Poster App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      {movieData.map(movie => {
        return (
          <div>
            <h1>{movie.title}</h1>
            {movie.poster_path && <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path} alt="Movie Poster" />}
            {movie.overview && <p>{movie.overview}</p>}
          </div>
      );
      }) }

    </div>
  );
};

export default Movie;
