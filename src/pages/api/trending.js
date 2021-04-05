export default async function (req, res) {
  const URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`;
  const { limit } = req.query;

  try {
    const response = await fetch(URL);
    const { results } = await response.json();

    let data = [];

    for (let i = 0; i < +limit; i++) {
      const title =
        results[i].media_type === "movie" ? results[i].title : results[i].name;

      const year =
        results[i].media_type === "movie"
          ? results[i].release_date.split("-")[0]
          : results[i].first_air_date.split("-")[0];

      data.push({
        media_type: results[i].media_type,
        id: results[i].id,
        title,
        year,
        overview: results[i].overview,
        backdropImage: `https://www.themoviedb.org/t/p/original${results[i].backdrop_path}`,
        rating: parseInt(+results[i].vote_average * 10),
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, code: err.code });
  }
}
