import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="keywords"
        content={
          keywords === ""
            ? "Movies, TV shows, Movie database, NextJS, React, TMDB API"
            : keywords
        }
      />
      <meta name="description" content={description} />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Movie-Tube",
  keywords: "Movies, TV shows, Movie database, NextJS, React, TMDB API",
  description: "Movies and Tv shows database, uses tmdb api, made with nextjs",
};

export default Meta;
