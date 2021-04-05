import SeasonData from "../../../../../components/SeasonDetail/SeasonDetail";

export default function SeasonDetail({ tv_id, season_number }) {
  return (
    <>
      <SeasonData tvId={tv_id} seasonNumber={season_number} />
    </>
  );
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      tv_id: params.id,
      season_number: params.season_number,
    },
  };
};
