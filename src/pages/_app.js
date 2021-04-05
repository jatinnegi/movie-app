import Navbar from "../components/Navbar/Navbar";
import GenreList from "../components/GenreList/GenreList";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <GenreList />
    </>
  );
}

export default MyApp;
