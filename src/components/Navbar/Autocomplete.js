import { useRouter } from "next/router";
import Spinner from "../Spinner";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";

const Autocomplete = ({
  searchInput,
  setSearchInput,
  isLoading,
  searchAutocomplete,
}) => {
  const router = useRouter();

  const handleClick = (e, media_type, id) => {
    e.preventDefault();
    setSearchInput("");
    router.push(`/${media_type}/${id}`);
  };

  return (
    <ul
      className={`${styles.search_autocomplete} ${
        searchInput.length < 4 ? styles.hide : ""
      }`}
    >
      {isLoading ? (
        <Spinner height={35} width={35} />
      ) : searchAutocomplete.length > 0 ? (
        searchAutocomplete.map((media, index) => (
          <li
            key={index}
            onClick={(e) => handleClick(e, media.media_type, media.id)}
          >
            <img src={media.poster_path} alt={media.title} />
            <p>
              {media.title} {media.year === "" ? "" : `(${media.year})`}
            </p>
          </li>
        ))
      ) : (
        <li>No Data Found</li>
      )}
    </ul>
  );
};

Autocomplete.propTypes = {
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchAutocomplete: PropTypes.array.isRequired,
};

export default Autocomplete;
