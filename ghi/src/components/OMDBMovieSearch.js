import React, { useState } from "react";


const Movie = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [plot, setPlot] = useState("");
  const [movieData, setMovieData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchMovieDetails(title);
      console.log(response)
      debugger
      if (response.Search) {
        setMovieData(response.Search)
      } else {
        setPoster("");
        setPlot("");
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setPoster("");
      setPlot("");
    }
  };

  const fetchMovieDetails = async (title) => {
    const response = await fetch(
      `https://api/themoviedb.org/3/search/${encodeURIComponent(title)}`
    );
    if (response.ok) {
      const data = await response.json();
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
            {/* change to response.result */}
            <h1>{movie.Title}</h1>
            {movie.Poster && <img src={movie.Poster} alt="Movie Poster" /> }
          </div>
        )
      })}
      <h1>{title}</h1>
      {poster && <img src={poster} alt="Movie Poster" />}
      {plot && <p>{plot}</p>}
    </div>
  );
};

export default Movie;
