import { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "../Spinner";
import styles from "./SeasonsList.module.css";
import PropTypes from "prop-types";

const SeasonsList = ({ tvId }) => {
  const [seasons, setSeasons] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSeasons({});
    setIsLoading(true);
    getAllSeasons();
  }, [tvId]);

  const getAllSeasons = async () => {
    try {
      const res = await fetch(`/api/tv/${tvId}/seasons`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.data === "ECONNRESET") {
          setTimeout(() => {
            console.log("sending another request...");
            getAllSeasons();
          }, 5000);
        }
      } else {
        setSeasons({ ...data });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h1>Seasons</h1>
          <div className={styles.grid}>
            {seasons.seasons.map((season, index) => (
              <div className={styles.season} key={index}>
                <div className={styles.poster_container}>
                  <img src={season.poster_path} alt={season.name} />
                </div>
                <div className={styles.detail}>
                  <h4>
                    <Link href={`/tv/${tvId}/season/${season.season_number}`}>
                      <a className={styles.link}>{season.name}</a>
                    </Link>
                  </h4>
                  <h5>
                    {season.year} | {season.episode_count} Episodes
                  </h5>
                  <p className={styles.air_date}>
                    {season.name} of {seasons.name} premiered on{" "}
                    {season.air_date}
                  </p>
                  <p className={styles.overview}>{season.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

SeasonsList.propTypes = {
  tvId: PropTypes.string.isRequired,
};

export default SeasonsList;
