import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import styles from "./MetaInfo.module.css";

const MetaInfo = ({ media_type, media_id, meta, setMeta }) => {
  const [metaInfo, setMetaInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMetaInfo(null);
    setIsLoading(true);
    getMetaInfo();
  }, [media_id]);

  useEffect(() => {
    setMeta({
      ...meta,
      keywords: metaInfo ? metaInfo.keywords.join(", ") : "",
    });
  }, [metaInfo]);

  const getMetaInfo = async () => {
    try {
      const res = await fetch(`/api/${media_type}/${media_id}/meta`);
      const data = await res.json();

      if (res.status === 400) {
        if (data.data === "ECONNRESET") {
          setTimeout(() => {
            console.log("sending another request...");
            getMetaInfo();
          }, 5000);
        }
      } else {
        setMetaInfo(data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && !metaInfo ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h3>Status</h3>
            {metaInfo.status}
          </div>
          <div>
            <h3>Original Language</h3>
            {metaInfo.original_language}
          </div>
          <div>
            {media_type === "movie" ? (
              <>
                <h3>Budget</h3>
                {metaInfo.budget === 0 ? "-" : metaInfo.budget}
              </>
            ) : (
              <>
                <h3>Type</h3>
                {metaInfo.type}
              </>
            )}
          </div>
          {metaInfo.number_of_seasons ? (
            <div>
              <h3>Number of seasons</h3>
              {metaInfo.number_of_seasons}
            </div>
          ) : null}
          <div>
            {media_type === "movie" ? (
              <>
                <h3>Revenue</h3>
                {metaInfo.revenue === 0 ? "-" : metaInfo.revenue}
              </>
            ) : (
              <>
                <h3>Network</h3>
                {metaInfo.networks.map((network, index) => (
                  <span key={index} className={styles.network_box}>
                    <img src={network.logo_path} alt={network.name}></img>
                  </span>
                ))}
              </>
            )}
          </div>
          <div className={styles.keyword_container}>
            <h3>Keywords</h3>
            {metaInfo.keywords.length > 0 ? (
              metaInfo.keywords.map((keyword, index) => (
                <span key={index}>{keyword}</span>
              ))
            ) : (
              <p>No Keywords</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

MetaInfo.propTypes = {
  media_type: PropTypes.string.isRequired,
  media_id: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  setMeta: PropTypes.func.isRequired,
};

export default MetaInfo;
