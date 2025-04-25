import { SongResponseDto } from "@vipulwaghmare/apis";
import Link from "next/link";

export function SongTab({
  songs,
  letter,
}: {
  songs: SongResponseDto[];
  letter: string;
}) {
  return (
    <div className="song-list">
      {songs.length > 0 ? (
        songs.map((song) => (
          <Link href={`/songs/${song.id}`} key={song.id} className="song-card">
            <div className="song-card-content">
              <h3 className="song-title">
                {song.name_english} {song.name_marathi}
              </h3>
              <div className="song-meta">
                <span>Singer: {song.singer}</span>
                <span>Lyricist: {song.lyricist}</span>
              </div>
              {song?.tags && (
                <div className="song-tags">
                  {song.tags.map((tag, index) => (
                    <span key={index} className="song-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))
      ) : (
        <p>{`No songs found with "${letter}"`}</p>
      )}
    </div>
  );
}
