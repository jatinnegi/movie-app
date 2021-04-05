import { useState, useEffect } from "react";
import Toggler from "../Toggler/Toggler";
import MediaList from "../MediaList/MediaList";
import styles from "./Popular.module.css";

const LIMIT = 20;

const Popular = () => {
  useEffect(() => {
    getPopularMovies();
    getPopularShows();
  }, []);

  const [movie, toggleMovie] = useState(true);

  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [isShowsLoading, setIsShowsLoading] = useState(true);

  const getPopularMovies = async () => {
    try {
      const res = await fetch(`/api/popular/movies?limit=${LIMIT}`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.code === "ECONNRESET")
          setTimeout(() => {
            console.log("sending another request");
            getPopularMovies();
          }, 5000);
      } else {
        setMovies([...data]);
        setIsMoviesLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPopularShows = async () => {
    try {
      const res = await fetch(`/api/popular/shows?limit=${LIMIT}`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.code === "ECONNRESET")
          setTimeout(() => {
            console.log("sending another request");
            getPopularShows();
          }, 5000);
      } else {
        setShows([...data]);
        setIsShowsLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1>What's Popular</h1>
        <Toggler movie={movie} toggleMovie={toggleMovie} />
      </div>
      {movie ? (
        <MediaList mediaItems={movies} isLoading={isMoviesLoading} />
      ) : (
        <MediaList mediaItems={shows} isLoading={isShowsLoading} />
      )}
    </>
  );
};

export default Popular;
