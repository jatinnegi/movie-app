import Rating from "../Rating";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styles from "./Slider.module.css";

const OVERLAY = "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.75))";

const Slide = ({
  media_type,
  id,
  title,
  year,
  overview,
  backdropImage,
  rating,
  className,
}) => {
  const router = useRouter();

  const handleClick = (e) => {
    router.push(`/${media_type}/${id}`);
  };

  return (
    <div
      className={className}
      style={{
        backgroundImage: `${OVERLAY}, url('${backdropImage}')`,
      }}
      onClick={handleClick}
    >
      <div className={styles.detail}>
        <div className={styles.main}>
          <h1>
            {title} {`(${year})`}
          </h1>
          <p>{overview}</p>
        </div>
        <div className={styles.rating}>
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  media_type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  backdropImage: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export default Slide;
