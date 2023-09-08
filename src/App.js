import "./App.css";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import MovieHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setmovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setsearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {

    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4a4af972`;
    const resonse = await fetch(url);
    const responseJson = await resonse.json();
    
    if(responseJson.Search){
      setmovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouritesList = [...favourites, movie];
    setFavourites([...newFavouritesList]);
    saveToLocalStorage(newFavouritesList);

  }

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
	};

  return (
    <div className="container-fluid movie-app">

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Movie" />
        <SearchBox searchValue= {searchValue} setsearchValue= {setsearchValue}/>
      </div>

      <div className="row">
        <MovieList movies={movies} handleFavouritesClick = {addFavouriteMovie} favouriteComponent = {AddFavourites}/>
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList movies={favourites} handleFavouritesClick = {removeFavouriteMovie} favouriteComponent = {RemoveFavourites}/>
      </div>
    </div>
  );
}

export default App;
