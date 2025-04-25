import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { searchSongs } from "@/lib/data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  const songs = await searchSongs(query);

  return (
    <div className="container">
      <h1 className="section-title">{`Search Results for "${query}"`}</h1>

      <SearchBar defaultValue={query} />

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
          <p>{`No songs found matching "${query}"`}</p>
        )}
      </div>
    </div>
  );
}
