import React, { useState } from 'react'
import 'dotenv'

const Movie = () => {
    const [movieData, setMovieData] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault
        try {
            const response = await fetchMovieDetails(title)
            console.log(response)
            debugger
            if (response.result) {
                setMovieData(response.result)
            } else {
                console.log("AAAAHHHH!")
            }
        } catch (e) {
            console.error("Error fetching movie details:", e)
        }
    }

    const fetchMovieDetails = async (title) => {
        const response = await fetch(
            `http://localhost:8000/movies/${encodeURIComponent(title)}`
        )
        if (response.ok) {
            const data = await response.json()
            return data
        }
        throw new Error('Failed to fetch movie details.')
    }

    return (
        <div>
            <h1>Movie Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={title}
                onChange={(e) => setMovieData(e.target.value)}
                placeholder='Enter A Movie Title'
                />
                <button type='submit'>Search</button>
            </form>
            {movieData.map(results => {
                return (
                    <div>
                        <h1>{results.original_title}</h1>
                        {results.poster_path && <img src={results.poster_path} alt="Movie Poster" /> }
                        {results.overview}
                    </div>
                )
            })}
        </div>
    )
}


