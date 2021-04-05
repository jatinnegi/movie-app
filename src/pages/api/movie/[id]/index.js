function getMovieData(results) {
  let title = `${results.title} (${results.release_date.split("-")[0]})`;
  let release_date = `${results.release_date.replace(/-/g, "/")}`;
  let runtime = `${parseInt(results.runtime / 60)}h${results.runtime % 60}m`;
  let rating = parseInt(results.vote_average * 10);
  let tagline = results.tagline;
  let overview = results.overview;
  let poster_path = results.poster_path
    ? `https://www.themoviedb.org/t/p/original${results.poster_path}`
    : "";
  let backdrop_path = results.backdrop_path
    ? `https://www.themoviedb.org/t/p/original${results.backdrop_path}`
    : "";

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
    poster_path,
    backdrop_path,
  };
}

export default async function (req, res) {
  const { id } = req.query;

  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );
    let results = await response.json();

    let data = {};

    data = { ...data, ...getMovieData(results) };

    response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );
    results = await response.json();
    let director = "";

    results.crew.forEach((crew) => {
      if (crew.job === "Director") director = crew.original_name;
    });

    data = { ...data, director };

    response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
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
