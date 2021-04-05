import { useState, useEffect } from "react";
import SearchRounded from "@material-ui/icons/SearchRounded";
import Autocomplete from "./Autocomplete";
import styles from "./Navbar.module.css";

const SearchInput = ({ ...rest }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchAutocomplete, setSearchAutocomplete] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (searchInput.length < 4) return;
    getAutocomplete();
  }, [searchInput]);

  const getAutocomplete = async () => {
    try {
      const res = await fetch(`/api/autocomplete?search=${searchInput}`);
      const data = await res.json();

      if (data.code === "ECONNRESET") {
        setTimeout(() => {
          console.log("sending another request...");
          getAutocomplete();
        }, 5000);
      }

      if (data.length > 0) setSearchAutocomplete([...data]);
      else setSearchAutocomplete([]);
      setIsLoading(false);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search_icon}>
        <SearchRounded />
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={styles.input}
          {...rest}
        />
        <Autocomplete
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isLoading={isLoading}
          searchAutocomplete={searchAutocomplete}
        />
      </div>
    </div>
  );
};

export default SearchInput;
