import languages from "../../../../languages.json";

export default async function (req, res) {
  const { id } = req.query;

  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${process.env.API_KEY}`
    );
    let results = await response.json();

    let original_language = "";
    languages.forEach((language) => {
      if (language.iso === results.original_language) {
        original_language = language.english_name;
      }
    });

    let networks = results.networks.map((network) => ({
      name: network.name,
      logo_path: `https://www.themoviedb.org/t/p/h30${network.logo_path}`,
    }));

    let data = {
      status: results.status,
      type: results.type,
      number_of_seasons: results.number_of_seasons,
      original_language,
      networks,
    };

    response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${process.env.API_KEY}`
    );
    const keywords_data = await response.json();
    data = {
      ...data,
      keywords: [
        ...keywords_data.results.map(
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
