import getCast from "../../../../utils/getCast";

export default async function (req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );
    const { cast } = await response.json();

    const actors = getCast(cast);

    res.status(200).json(actors);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err.code });
  }
}
