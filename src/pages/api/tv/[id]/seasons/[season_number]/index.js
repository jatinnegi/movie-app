import formatDate from "../../../../../../utils/formatDate";

export default async function (req, res) {
  const { id, season_number } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data = await response.json();

    const seasonData = {
      year: data.air_date.split("-")[0],
      name: data.name,
      poster_path: `https://www.themoviedb.org//t/p/w58_and_h87_face${data.poster_path}`,
      episodes: data.episodes.map((episode) => ({
        episode_number: episode.episode_number,
        name: episode.name,
        air_date: formatDate(episode.air_date),
        overview:
          episode.overview === ""
            ? "We dont't have an overview for this episode"
            : episode.overview,
        vote_average: episode.vote_average,
        crew: episode.crew.map((crew) => ({
          job: crew.job,
          name: crew.name,
        })),
        guest_stars: episode.guest_stars.map((star) => ({
          name: star.name,
          character: star.character,
          profile_path: star.profile_path
            ? `https://www.themoviedb.org/t/p/w66_and_h66_face${star.profile_path}`
            : "https://themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-7de7dfcae838579a18f4eebc5b8847230d154718e481c5cd01c477cfcbc85993.svg",
        })),
        still_path: episode.still_path
          ? `https://www.themoviedb.org/t/p/original${episode.still_path}`
          : "https://themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg",
      })),
    };

    res.status(200).json(seasonData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err.code });
  }
}
