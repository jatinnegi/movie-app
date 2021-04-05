import { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "../Spinner";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import StarIcon from "@material-ui/icons/Star";
import PropTypes from "prop-types";
import styles from "./SeasonDetail.module.css";

const SeasonDetail = ({ tvId, seasonNumber }) => {
  const [seasonData, setSeasonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSeasonData({});
    setIsLoading(true);
    getSeasonData();
  }, [tvId, seasonNumber]);

  const getSeasonData = async () => {
    try {
      const res = await fetch(`/api/tv/${tvId}/seasons/${seasonNumber}`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.data === "ECONNRESET") {
          setTimeout(() => {
            console.log("sending another request");
            getSeasonData();
          }, 5000);
        }
      } else {
        setSeasonData({ ...data });
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.season_detail}>
      {isLoading ? (
        <div className={styles.spinner_container}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={styles.season_header}>
            <div className={styles.container}>
              <img src={seasonData.poster_path} alt={seasonData.name} />
              <div>
                <h1>
                  <Link href={`/tv/${tvId}/season/${seasonNumber}`}>
                    <a className={styles.link}>
                      {seasonData.name} ({seasonData.year})
                    </a>
                  </Link>
                </h1>
                <h3 className={styles.action}>
                  <Link href={`/tv/${tvId}`}>
                    <a className={styles.link}>
                      <ArrowBackIcon fontSize="small" />
                      <span>Back</span>
                    </a>
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className={styles.episode_list}>
            <div className={styles.container}>
              <h2>
                Episodes{" "}
                <span style={{ color: "#aaa" }}>
                  {seasonData.episodes.length}
                </span>
              </h2>
              {seasonData.episodes.map((episode, index) => (
                <div className={styles.episode_item} key={index}>
                  <div className={styles.episode_detail}>
                    <img src={episode.still_path} alt={episode.name} />
                    <div className={styles.container}>
                      <div>
                        <h5 className={styles.episode_number}>
                          {episode.episode_number}.
                        </h5>
                        <span className={styles.vote_average}>
                          <StarIcon style={{ fontSize: "14px" }} />{" "}
                          <span style={{ marginLeft: "3px" }}>
                            {episode.vote_average}
                          </span>
                        </span>
                        <h5>{episode.name}</h5>
                        <h5 className={styles.air_date}>{episode.air_date}</h5>
                      </div>
                      <p className={styles.overview}>{episode.overview}</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.episode_credits} ${styles.container}`}
                  >
                    <div className={styles.crew}>
                      {episode.crew.map((crew, index) => (
                        <div key={index}>
                          <h5>{crew.job}</h5>:{" "}
                          <span style={{ fontSize: "14px" }}>{crew.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.guest_stars_container}>
                      <h3>Guest Stars</h3>
                      {episode.guest_stars.length > 0 ? (
                        episode.guest_stars.map((actor, index) => (
                          <div className={styles.actor} key={index}>
                            <div
                              className={styles.profile_photo}
                              style={{
                                backgroundImage: `url("${actor.profile_path}")`,
                              }}
                            ></div>
                            <div className={styles.actor_detail}>
                              <h5>{actor.name}</h5>
                              <p>{actor.character}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ paddingBottom: "20px" }}>
                          No guest stars have been added
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

SeasonDetail.propTypes = {
  tvId: PropTypes.string.isRequired,
  seasonNumber: PropTypes.string.isRequired,
};

export default SeasonDetail;
