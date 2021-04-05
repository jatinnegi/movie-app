import Router from "next/router";
import Rating from "../Rating";
import PropTypes from "prop-types";
import styles from "./MediaList.module.css";

const OVERLAY = "linear-gradient(rgba(0,0,0, 0), rgba(0,0,0,0.5))";

const MediaItem = ({ media }) => {
  const handleClick = (e) => {
    e.preventDefault();
    Router.push(`/${media.media_type}/${media.id}`);
  };

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.main}>
        <div
          className={styles.poster}
          style={{
            backgroundImage: `${OVERLAY}, url("${media.poster_path}")`,
          }}
        ></div>
        <div className={styles.rating}>
          <Rating
            rating={media.rating}
            size={60}
            lineWidth={50}
            fontSize={100}
          />
        </div>
      </div>
      <div className={styles.detail}>
        <p className={styles.title}>{media.title}</p>
        <p className={styles.year}>{media.year}</p>
      </div>
    </div>
  );
};

MediaItem.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MediaItem;
