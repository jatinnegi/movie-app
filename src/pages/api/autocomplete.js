export default async function (req, res) {
  const { search } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
    );
    const { results } = await response.json();
    let data = [];

    for (let i = 0; i < 10; i++) {
      if (results[i] === undefined) break;
      if (results[i].media_type === "movie" || results[i].media_type === "tv") {
        let title =
          results[i].media_type === "movie"
            ? results[i].title
            : results[i].name;

        let year;
        if (results[i].media_type === "movie")
          year = results[i].release_date
            ? results[i].release_date.split("-")[0]
            : "";
        else
          year = results[i].first_air_date
            ? results[i].first_air_date.split("-")[0]
            : "";

        let poster_path = results[i].poster_path
          ? `https://www.themoviedb.org/t/p/original${results[i].poster_path}`
          : "https://media.comicbook.com/files/img/default-movie.png";

        data.push({
          id: results[i].id,
          media_type: results[i].media_type,
          title,
          year,
          poster_path,
        });
      }
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, code: err.code });
  }
}
