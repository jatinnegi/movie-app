export default function getCast(cast) {
  const actors = cast.map((cast) => ({
    original_name: cast.original_name,
    character: cast.character,
    profile_path: cast.profile_path
      ? `https://www.themoviedb.org/t/p/original${cast.profile_path}`
      : "https://pbs.twimg.com/profile_images/716487122224439296/HWPluyjs_400x400.jpg",
  }));

  return actors;
}
