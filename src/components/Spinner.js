import PropTypes from "prop-types";

const Spinner = ({ height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="spinner"
    width={width ? width : "100px"}
    height={height ? height : "100px"}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      strokeWidth="8"
      stroke="#1d3f72"
      strokeDasharray="50.26548245743669 50.26548245743669"
      fill="none"
      strokeLinecap="round"
      className="circle1"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
        className="animate-transform1"
      ></animateTransform>
    </circle>
    <circle
      cx="50"
      cy="50"
      r="23"
      strokeWidth="8"
      stroke="#5699d2"
      strokeDasharray="36.12831551628262 36.12831551628262"
      strokeDashoffset="36.12831551628262"
      fill="none"
      strokeLinecap="round"
      className="circle2"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 50;-360 50 50"
        className="animate-transform2"
      ></animateTransform>
    </circle>
  </svg>
);

Spinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Spinner;
