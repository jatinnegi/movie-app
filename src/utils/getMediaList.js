import formatDate from "./formatDate";

export default function (media_type, results, limit) {
  let data = [];

  for (let i = 0; i < +limit; i++) {
    if (results[i] === undefined) break;

    let title = media_type === "movie" ? results[i].title : results[i].name;
    let year =
      media_type === "movie"
        ? formatDate(results[i].release_date)
        : formatDate(results[i].first_air_date);

    data.push({
      id: results[i].id,
      media_type,
      title,
      year,
      poster_path: `https://www.themoviedb.org/t/p/original${results[i].poster_path}`,
      rating: parseInt(+results[i].vote_average * 10),
    });
  }

  return data;
}
