import Circle from "react-circle";
import PropTypes from "prop-types";

const Rating = ({ rating, size, lineWidth, fontSize, textColor }) => (
  <Circle
    progress={rating}
    animate={true}
    size={size ? size : 75}
    lineWidth={lineWidth ? lineWidth : 35}
    roundedStroke={true}
    textColor={textColor ? textColor : "white"}
    textStyle={{
      fontSize: `${fontSize ? fontSize : 85}`,
      font: "bold 5rem Quicksand, sans-serif",
    }}
    percentSpacing={0}
  />
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number,
  lineWidth: PropTypes.number,
  fontSize: PropTypes.number,
  textColor: PropTypes.string,
};

export default Rating;
