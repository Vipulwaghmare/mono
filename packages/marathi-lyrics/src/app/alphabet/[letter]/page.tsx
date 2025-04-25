import { AlphabetNav } from "@/components/alphabet-nav";
import { SearchBar } from "@/components/search-bar";
import { SongResponseDto } from "@vipulwaghmare/apis";
import api from "@/lib/api";
import { SongTab } from "@/components/song-tab";

export default async function AlphabetPage({
  params,
}: {
  params: { letter: string };
}) {
  const letter = decodeURIComponent(params.letter);
  let songs: SongResponseDto[] = [];
  try {
    const response = await api.marathiControllerGetSongByStartLetter(letter);
    songs = response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    // You could also set a state here to show an error message to the user
  }

  return (
    <div className="container">
      <h1 className="section-title">{` Songs Starting With "${letter}"`}</h1>

      <SearchBar />

      <AlphabetNav activeAlphabet={letter} />

      <SongTab songs={songs} letter={letter} />
    </div>
  );
}
