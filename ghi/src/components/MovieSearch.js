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
      // debugger //response.results for TMDB
      if (response) {
        setMovieData(response);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setPoster("");
      setPlot("");
    }
  };

  const fetchMovieDetails = async (title) => {
    const response = await fetch(`http://localhost:8000/movies/${encodeURIComponent(title)}`);
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
          <div key={movie.poster_path} className="shadow-lg card bg-light mb-3">
            <h1 className="card-header">{movie.title}</h1>
            <div className="card-body">
            {movie.poster_path && <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path} alt="Movie Poster" />}
            {movie.overview && <p>{movie.overview}</p>}
            </div>
          </div>
      );
      }) }

    </div>
  );
};

export default Movie;

          // <div className="shadow-lg card bg-light mb-3">
          //   <h1 className="card-header">{movie.title}</h1>
          //   <p className="card-body">
          //   {movie.poster_path && <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path} alt="Movie Poster" />}
          //   {movie.overview && <p>{movie.overview}</p>}
          //   </p>