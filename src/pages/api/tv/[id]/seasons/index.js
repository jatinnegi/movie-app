export default async function (req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );
    const data = await response.json();

    const seasonList = data.seasons.map((season) => ({
      season_number: season.season_number,
      name: season.name,
      episode_count: season.episode_count,
      year: season.air_date.split("-")[0],
      air_date: season.air_date.replace(/-/g, "/"),
      overview: season.overview,
      poster_path: `https://www.themoviedb.org/t/p/original${season.poster_path}`,
    }));

    res.status(200).json({ name: data.name, seasons: seasonList });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err.code });
  }
}
