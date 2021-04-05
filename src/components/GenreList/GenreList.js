import genres from "../../genres.json";
import styles from "./GenreList.module.css";

const GenreList = () => {
  return (
    <>
      <div
        style={{
          background: "#032541",
          color: "#fff",
          padding: "30px 0",
          textAlign: "center",
        }}
      >
        <h1 className={styles.header}>Genres</h1>
        <ul className={styles.grid}>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GenreList;
