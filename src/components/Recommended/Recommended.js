import { useEffect, useState } from "react";
import MediaList from "../MediaList/MediaList";
import PropTypes from "prop-types";

const LIMIT = 10;

const Recommended = ({ media_type, media_id }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMediaItems([]);
    setIsLoading(true);
    getRecommended();
  }, [media_id]);

  const getRecommended = async () => {
    try {
      const res = await fetch(
        `/api/${media_type}/${media_id}/recommended?limit=${LIMIT}`
      );
      const data = await res.json();

      if (res.status === 400) {
        if (data.data === "ECONNRESET") {
          setTimeout(() => {
            console.log("sending another request");
            getRecommended();
          }, 5000);
        }
      } else {
        setMediaItems([...data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MediaList
      heading={"Also Recommended"}
      mediaItems={mediaItems}
      isLoading={isLoading}
    />
  );
};

Recommended.propTypes = {
  media_type: PropTypes.string.isRequired,
  media_id: PropTypes.string.isRequired,
};

export default Recommended;
