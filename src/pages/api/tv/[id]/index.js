function getTvData(results) {
  let title = `${results.original_name} (${
    results.first_air_date.split("-")[0]
  })`;
  let release_date = results.first_air_date.replace(/-/g, "/");
  let runtime = `${results.episode_run_time[0]}m`;
  let rating = parseInt(results.vote_average * 10);
  let tagline = results.tagline;
  let overview = results.overview;
  let poster_path = results.poster_path
    ? `https://www.themoviedb.org/t/p/original${results.poster_path}`
    : "";
  let backdrop_path = results.backdrop_path
    ? `https://www.themoviedb.org/t/p/original${results.backdrop_path}`
    : "";
  let created_by = results.created_by.map((creator) => creator.name).join(",");

  let genres = "";

  results.genres.forEach((genre, index) => {
    if (index === 0) genres = genre.name;
    else genres += `, ${genre.name}`;
  });

  return {
    title,
    release_date,
    genres,
    runtime,
    rating,
    tagline,
    overview,
    created_by,
    poster_path,
    backdrop_path,
  };
}

export default async function (req, res) {
  const { id } = req.query;

  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );
    let results = await response.json();

    let data = {};

    data = { ...data, ...getTvData(results) };

    response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );
    results = await response.json();

    let trailer = "";

    results.results.forEach((result) => {
      if (result.type === "Trailer" && result.site === "YouTube")
        trailer = `https://www.youtube.com/embed/${result.key}`;
    });

    data = { ...data, trailer };

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err.code });
  }
}
