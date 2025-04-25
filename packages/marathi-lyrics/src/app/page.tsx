import { AlphabetNav } from "@/components/alphabet-nav";
import { SearchBar } from "@/components/search-bar";
import api from "@/lib/api";
import { SongResponseDto } from "@vipulwaghmare/apis";
import { SongTab } from "@/components/song-tab";

const letter = "अ";

export default async function Home() {
  // Default to showing songs starting with 'अ'
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
      <h1 className="section-title">Marathi Song Lyrics Collection</h1>

      <SearchBar />

      <AlphabetNav activeAlphabet="अ" />

      <SongTab songs={songs} letter={letter} />
    </div>
  );
}
