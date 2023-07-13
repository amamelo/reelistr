import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const MovieCards = ({ movies }) => {
    const [currentMovies, setCurrentMovies] = useState(movies);

    return (
        <>
        {Object.keys(currentMovies).length === 0 && (
            <h1 style={{ marginTop: "30px", textAlign: "center"}}>
            {" "}
            No results found
            </h1>
        )}
        <div className='movies'>
            {currentMovies.map((movie) => (
                <div
                key={movie.poster_path}
                className='container'
                style={{ maxWidth: "70%", maxHeight: "", marginTop: "20px" }}
                >
                    <div className='shadow-lg movie-card card text-center'>
                        <img
                        className='card-img-top w-100 d-block moviecardimg'
                        src={movie.poster_path}
                        alt="movie poster"
                        ></img>
                        <div className='card-body'>
                            <h4 className='card-title'>{movie.title}</h4>
                            <Link className='btn btn-primary' to={`/`}>
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default MovieCards;
