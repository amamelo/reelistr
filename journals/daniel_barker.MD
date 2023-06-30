## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.


REELISTr

"Unleash the Magic of Cinema with Reelistr: Your Ultimate Film Database!"

OMDb: We would get movies using a search string

```
(eg: http://www.omdbapi.com/?apikey=3b11de2&s=tropic would return:

{
	"Search": [
		{
			"Title": "Tropic Thunder",
			"Year": "2008",
			"imdbID": "tt0942385",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BNDE5NjQzMDkzOF5BMl5BanBnXkFtZTcwODI3ODI3MQ@@._V1_SX300.jpg"
		},
		{
			"Title": "Tropic Thunder: Rain of Madness",
			"Year": "2008",
			"imdbID": "tt1286750",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BMTc2ODI3ODU2OF5BMl5BanBnXkFtZTcwOTk5NTEzMg@@._V1_SX300.jpg"
		}
    ]
	"totalResults": "2",
	"Response": "True"
}
)
```


we would then take the search and put the results in cards. Each card will be clickable. On click it will then send the imdbID to a new link using the format http://www.omdbapi.com/?apikey=3b11de2&i={imdbID}&plot=full. We then populate the page with 



And we would code the movie cards to be clickable. On click,
