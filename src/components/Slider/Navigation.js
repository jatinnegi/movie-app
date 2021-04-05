import styles from "./Slider.module.css";
import PropTypes from "prop-types";

const Navigation = ({ limit, currentSlide, setCurrentSlide }) => {
  const getNavigators = () => {
    let navigators = [];

    for (let index = 0; index < limit; index++) {
      navigators.push(
        <div
          key={index}
          id={index}
          className={`${styles.navigator} ${
            currentSlide === index ? styles.current : ""
          }`}
          onClick={(e) => setCurrentSlide(+e.target.id)}
        ></div>
      );
    }
    return navigators;
  };

  return <div className={styles.navigation}>{getNavigators()}</div>;
};

Navigation.propTypes = {
  limit: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
};

export default Navigation;
