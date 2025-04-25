import Link from "next/link";
import { getSongById } from "@/lib/data";
import { MusicLinks } from "@/components/music-link";

export default async function SongPage({ params }: { params: { id: string } }) {
  const song = await getSongById(params.id);

  if (!song) {
    return (
      <div className="container">
        <div style={{ padding: "4rem 0", textAlign: "center" }}>
          <h1>Song not found</h1>
          <p>{`The song you're looking for doesn't exist or has been removed.`}</p>
          <Link
            href="/"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container song-detail">
      <div className="song-header">
        <h1 className="section-title">{song.name}</h1>
        <div className="song-meta">
          <p>
            <strong>Singer:</strong> {song.singer}
          </p>
          <p>
            <strong>Lyricist:</strong> {song.lyricist}
          </p>
          <p>
            <strong>Genre:</strong> {song.tags.join(", ")}
          </p>
        </div>

        <div className="song-actions">
          <MusicLinks song={song} />
        </div>
      </div>

      <div className="lyrics-container">
        <h2 className="section-title">Lyrics</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <h3
              style={{ marginBottom: "1rem", color: "var(--color-secondary)" }}
            >
              मराठी (Marathi)
            </h3>
            <div style={{ whiteSpace: "pre-line" }}>{song.lyrics_marathi}</div>
          </div>
          <div>
            <h3
              style={{ marginBottom: "1rem", color: "var(--color-secondary)" }}
            >
              English Transliteration
            </h3>
            <div style={{ whiteSpace: "pre-line" }}>{song.lyrics_english}</div>
          </div>
        </div>
      </div>

      {song.meaning && (
        <div className="meaning-container">
          <h2 className="section-title">Meaning & Interpretation</h2>
          <div>{song.meaning}</div>
        </div>
      )}

      <Link href="/" className="btn btn-primary">
        Back to Songs
      </Link>
    </div>
  );
}
