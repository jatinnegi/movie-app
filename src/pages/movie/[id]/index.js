import { useState } from "react";
import Meta from "../../../components/Meta";
import Container from "../../../components/Container/Container";
import Banner from "../../../components/Banner/Banner.js";
import Cast from "../../../components/Cast/Cast";
import MetaInfo from "../../../components/MetaInfo/MetaInfo";
import Recommended from "../../../components/Recommended/Recommended";
import styles from "./../../../styles/Media.module.css";

export default function Movie({ movieId }) {
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
  });

  return (
    <>
      <Meta
        title={meta.title}
        keywords={meta.keywords}
        description={meta.description}
      />
      <Banner
        media_type="movie"
        media_id={movieId}
        meta={meta}
        setMeta={setMeta}
      />
      <Container>
        <div className={styles.container}>
          <Cast media_type="movie" media_id={movieId} />
          <MetaInfo
            media_type="movie"
            media_id={movieId}
            meta={meta}
            setMeta={setMeta}
          />
        </div>
        <Recommended media_type="movie" media_id={movieId} />
      </Container>
    </>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      movieId: params.id,
    },
  };
};
