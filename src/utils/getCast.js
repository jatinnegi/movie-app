export default function getCast(cast) {
  const actors = cast.map((cast) => ({
    original_name: cast.original_name,
    character: cast.character,
    profile_path: cast.profile_path
      ? `https://www.themoviedb.org/t/p/original${cast.profile_path}`
      : "https://themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg",
  }));

  return actors;
}
