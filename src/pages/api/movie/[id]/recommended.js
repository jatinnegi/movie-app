import getMediaList from "../../../../utils/getMediaList";

export default async function (req, res) {
  const { id, limit } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();

    const data = getMediaList("movie", results, limit);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err.code });
  }
}
