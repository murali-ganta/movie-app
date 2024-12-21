/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'
import './App.css'

// API Key and URL
const API_KEY = 'd9981918'
const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  // Movies State
  const [movies, setMovies] = useState([]);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch API with movie title
  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  // UseEffect for Search 
  useEffect(()=>{
    searchMovies('Marvel')
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      
      {/* Input Search with title */}
      <div className="search">
        <input 
          placeholder='Search for movies'
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/* Rendering Movies */}
      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => {
              // console.log(movie)
              return <MovieCard key={movie.imdbID} movie={movie} />;
            })}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App;