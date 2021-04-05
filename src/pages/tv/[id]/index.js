import { useState } from "react";
import Meta from "../../../components/Meta";
import Banner from "../../../components/Banner/Banner";
import Container from "../../../components/Container/Container";
import Cast from "../../../components/Cast/Cast";
import MetaInfo from "../../../components/MetaInfo/MetaInfo";
import SeasonsList from "../../../components/SeasonsList/SeasonsList";
import Recommended from "../../../components/Recommended/Recommended";
import styles from "./../../../styles/Media.module.css";

export default function Tv({ tvId }) {
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
      <Banner media_type="tv" media_id={tvId} meta={meta} setMeta={setMeta} />

      <Container>
        <div className={styles.container}>
          <Cast media_type="tv" media_id={tvId} />
          <MetaInfo
            media_type="tv"
            media_id={tvId}
            meta={meta}
            setMeta={setMeta}
          />
        </div>
        <SeasonsList tvId={tvId} />
        <Recommended media_type="tv" media_id={tvId} />
      </Container>
    </>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      tvId: params.id,
    },
  };
};
