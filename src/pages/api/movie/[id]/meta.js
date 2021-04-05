import languages from "../../../../languages.json";

export default async function (req, res) {
  const { id } = req.query;

  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );
    let results = await response.json();

    let original_language = "";
    languages.forEach((language) => {
      if (language.iso === results.original_language) {
        original_language = language.english_name;
      }
    });

    let data = {
      status: results.status,
      original_language,
      budget: results.budget,
      revenue: results.revenue,
    };

    response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${process.env.API_KEY}`
    );
    const { keywords } = await response.json();
    data = {
      ...data,
      keywords: [
        ...keywords.map(
          (keyword) =>
            keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)
        ),
      ],
    };

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err.code });
  }
}
