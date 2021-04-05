import MediaItem from "./MediaItem";
import Spinner from "../Spinner";
import styles from "./MediaList.module.css";
import PropTypes from "prop-types";

const MediaList = ({ heading, mediaItems, isLoading }) => {
  return (
    <>
      <h1 className={styles.heading}>{heading}</h1>
      <div className={styles.container}>
        {isLoading && mediaItems.length === 0 ? (
          <Spinner />
        ) : mediaItems.length === 0 ? (
          <h4>No Data Found</h4>
        ) : (
          <div className={styles.grid}>
            {mediaItems.map((item, index) => (
              <MediaItem key={index} media={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

MediaList.propTypes = {
  heading: PropTypes.string,
  mediaItems: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MediaList;
