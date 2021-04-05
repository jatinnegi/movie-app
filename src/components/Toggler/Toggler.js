import styles from "./Toggler.module.css";

const Toggler = ({ movie, toggleMovie }) => {
  return (
    <div className={styles.toggler}>
      <span
        onClick={() => toggleMovie(true)}
        style={{ color: movie ? "#fff" : "#000" }}
      >
        Movie
      </span>
      <span
        onClick={() => toggleMovie(false)}
        style={{ color: !movie ? "#fff" : "#000" }}
      >
        TV
      </span>
      <div
        className={`${styles.active} ${movie ? styles.movie : styles.tv}`}
      ></div>
    </div>
  );
};

export default Toggler;
