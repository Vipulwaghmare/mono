"use client";
import { SongResponseDto } from "@vipulwaghmare/apis";
import { useState } from "react";

export function MusicLinks({ song }: { song: SongResponseDto }) {
  const [showLinks, setShowLinks] = useState(false);

  const musicServices = [
    {
      name: "YouTube Music",
      url: `https://music.youtube.com/search?q=${encodeURIComponent(song.name_english + " " + song.singer)}`,
    },
    {
      name: "Spotify",
      url: `https://open.spotify.com/search/${encodeURIComponent(song.name_english + " " + song.singer)}`,
    },
    {
      name: "JioSaavn",
      url: `https://www.jiosaavn.com/search/${encodeURIComponent(song.name_english)}`,
    },
    {
      name: "Gaana",
      url: `https://gaana.com/search/${encodeURIComponent(song.name_english)}`,
    },
  ];

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowLinks(!showLinks)}
      >
        Listen on Music Platforms
      </button>

      {showLinks && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "var(--color-white)",
            padding: "1rem",
            borderRadius: "var(--border-radius)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginTop: "0.5rem",
            zIndex: 10,
          }}
        >
          {musicServices.map((service) => (
            <a
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{
                display: "block",
                margin: "0.5rem 0",
                textAlign: "center",
              }}
            >
              {service.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
