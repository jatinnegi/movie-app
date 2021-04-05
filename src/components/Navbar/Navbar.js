import { useEffect, useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [navbarDark, toggleNavbarDark] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 250) {
      toggleNavbarDark(true);
    }
    if (window.scrollY < 250) {
      toggleNavbarDark(false);
    }
  };
  return (
    <nav
      className={
        navbarDark ? `${styles.navbar} ${styles.dark}` : `${styles.navbar}`
      }
    >
      <div className={styles.container}>
        <h1 className={styles.header}>
          <Link href="/">
            <a>Movie-Tube</a>
          </Link>
        </h1>
        <SearchInput
          autoComplete="off"
          placeholder="Search Movies and TV Shows"
        />
      </div>
    </nav>
  );
};

export default Navbar;
