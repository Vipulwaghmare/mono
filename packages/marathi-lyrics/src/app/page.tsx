import Link from "next/link";
import { AlphabetNav } from "@/components/alphabet-nav";
import { SearchBar } from "@/components/search-bar";
import { getSongsByAlphabet } from "@/lib/data";

export default async function Home() {
  // Default to showing songs starting with 'अ'
  const songs = await getSongsByAlphabet("अ");

  return (
    <div className="container">
      <h1 className="section-title">Marathi Song Lyrics Collection</h1>

      <SearchBar />

      <AlphabetNav activeAlphabet="अ" />

      <div className="song-list">
        {songs.map((song) => (
          <Link href={`/songs/${song.id}`} key={song.id} className="song-card">
            <div className="song-card-content">
              <h3 className="song-title">{song.name}</h3>
              <div className="song-meta">
                <span>Singer: {song.singer}</span>
                <span>Lyricist: {song.lyricist}</span>
              </div>
              <div className="song-tags">
                {song.tags.map((tag, index) => (
                  <span key={index} className="song-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
