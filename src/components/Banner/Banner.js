import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import Rating from "../Rating";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import styles from "./Banner.module.css";
import PropTypes from "prop-types";

const OVERLAY = "linear-gradient(rgb(3, 37, 65, 0.5), rgb(3, 37, 65, 0.9))";

const Banner = ({ media_type, media_id, meta, setMeta }) => {
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayTrailer, toggleDisplayTrailer] = useState(false);

  useEffect(() => {
    setMedia(null);
    setIsLoading(true);
    getMediaData();
  }, [media_id]);

  useEffect(() => {
    setMeta({
      ...meta,
      title: media ? media.title : "",
      description: media ? media.overview : "",
    });
  }, [media]);

  const getMediaData = async () => {
    try {
      const res = await fetch(`/api/${media_type}/${media_id}`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.data === "ECONNRESET") {
          setTimeout(() => {
            console.log("sending another request");
            getMediaData();
          }, 5000);
        } else console.log(data);
      } else {
        setMedia(data);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log(err.code);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();

    const iframe = document.getElementById("yt_iframe");
    if (iframe) {
      let iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    toggleDisplayTrailer(false);
  };

  return isLoading && !media ? (
    <div
      className={styles.banner}
      style={{
        backgroundImage: "var(--secondary-color)",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `${OVERLAY}, url('${media.backdrop_path}')`,
        }}
      >
        <div className={styles.container}>
          <div className={styles.poster}>
            <img src={media.poster_path} alt="rent-a-pal-poster" />
          </div>
          <div className={styles.detail}>
            <h1 className={styles.title}>{media.title}</h1>
            <p className={styles.info}>
              {media.release_date}
              <span className={styles.genre_list}>{media.genres}</span>
              {media.runtime}
            </p>
            <div className={styles.other_info}>
              <Rating rating={media.rating} lineWidth={50} />

              <button
                className={styles.watch_now}
                onClick={() => toggleDisplayTrailer(true)}
              >
                <PlayArrowIcon fontSize="large" />
                <span>Watch Trailer</span>
              </button>
            </div>
            <i className={styles.tagline}>{media.tagline}</i>
            <div className={styles.overview}>
              <h3>Overview</h3>
              <p>{media.overview}</p>
            </div>
            <div className={styles.crew_detail}>
              <div>
                <h3>
                  {media_type === "movie" ? media.director : media.created_by}
                </h3>
                {media_type === "movie" ? <p>Director</p> : <p>Creator</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          displayTrailer ? styles.trailer : `${styles.trailer} ${styles.hide}`
        }
      >
        <div className={styles.trailer_container}>
          <div className={styles.header}>
            <h4>Play Trailer</h4>
            <span onClick={handleClose}>x</span>
          </div>
          {media.trailer === "" ? (
            <h2 style={{ background: "#000", color: "#fff", padding: "10px" }}>
              No Trailer Available
            </h2>
          ) : (
            <iframe
              id="yt_iframe"
              src={media.trailer}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </>
  );
};

Banner.propTypes = {
  media_type: PropTypes.string.isRequired,
  media_id: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  setMeta: PropTypes.func.isRequired,
};

export default Banner;
