import Link from "next/link";
import { AlphabetNav } from "@/components/alphabet-nav";
import { SearchBar } from "@/components/search-bar";
import { getSongsByAlphabet } from "@/lib/data";

export default async function AlphabetPage({
  params,
}: {
  params: { letter: string };
}) {
  const letter = decodeURIComponent(params.letter);
  const songs = await getSongsByAlphabet(letter);

  return (
    <div className="container">
      <h1 className="section-title">{` Songs Starting With "${letter}"`}</h1>

      <SearchBar />

      <AlphabetNav activeAlphabet={letter} />

      <div className="song-list">
        {songs.length > 0 ? (
          songs.map((song) => (
            <Link
              href={`/songs/${song.id}`}
              key={song.id}
              className="song-card"
            >
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
          ))
        ) : (
          <p>{`No songs found starting with "${letter}"`}</p>
        )}
      </div>
    </div>
  );
}
