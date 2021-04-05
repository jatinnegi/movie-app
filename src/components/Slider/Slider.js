import { useEffect, useState } from "react";
import Slide from "./Slide";
import Navigation from "./Navigation";
import Spinner from "../Spinner";
import styles from "./Slider.module.css";

const LIMIT = 10;

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTrending();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === LIMIT - 1) setCurrentSlide(0);
      else setCurrentSlide(currentSlide + 1);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);

  const getTrending = async () => {
    try {
      const res = await fetch(`/api/trending?limit=${LIMIT}`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.code === "ECONNRESET")
          setTimeout(() => {
            console.log("sending another request");
            getTrending();
          }, 5000);
      } else {
        setMovies([...data]);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.slider}>
      {isLoading && movies.length === 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        movies.map((movie, index) => (
          <Slide
            key={index}
            media_type={movie.media_type}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            overview={movie.overview}
            backdropImage={movie.backdropImage}
            rating={movie.rating}
            className={`${styles.slide} ${
              currentSlide === index ? styles.display : ""
            }`}
          />
        ))
      )}
      <Navigation
        limit={LIMIT}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
};

export default Slider;
