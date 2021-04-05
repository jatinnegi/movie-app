import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import styles from "./Cast.module.css";

const Cast = ({ media_type, media_id }) => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCast([]);
    setIsLoading(true);
    getCast();
  }, [media_id]);

  const getCast = async () => {
    try {
      const res = await fetch(`/api/${media_type}/${media_id}/cast`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.data === "ECONNRESET") {
          setTimeout(() => {
            console.log("sending another request");
            getCast();
          }, 5000);
        }
      } else {
        setCast([...data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.cast_container}>
      <h1>Cast</h1>
      <div className={styles.cast_list}>
        {isLoading ? (
          <Spinner />
        ) : (
          cast.map((actor, index) => (
            <div key={index} className={styles.cast_item}>
              <div
                className={styles.actor_image}
                style={{ backgroundImage: `url("${actor.profile_path}")` }}
              ></div>
              <div className={styles.detail}>
                <p className={styles.original_name}>{actor.original_name}</p>
                <p>{actor.character}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Cast.propTypes = {
  media_type: PropTypes.string.isRequired,
  media_id: PropTypes.string.isRequired,
};

export default Cast;
