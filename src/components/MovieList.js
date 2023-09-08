import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          key={index}
          style={{ width: "276px", height: "400px" }}
          className="image-container d-flex justify-content-start m-1"
        >
          <img
            src={movie.Poster}
            alt="movie"
            style={{ width: "100%", height: "100%" }}
          />
          <div
            onClick={()=> props.handleFavouritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
          
        </div>
      ))}
    </>
  );
};

export default MovieList;
