export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h1 className="section-title">About Antarakshari</h1>

      <div
        style={{
          backgroundColor: "var(--color-white)",
          padding: "2rem",
          borderRadius: "var(--border-radius)",
          marginBottom: "2rem",
        }}
      >
        <p style={{ marginBottom: "1rem" }}>
          Antarakshari is a comprehensive collection of Marathi song lyrics,
          designed to help music lovers find and enjoy their favorite songs.
        </p>

        <p style={{ marginBottom: "1rem" }}>Our platform allows you to:</p>

        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "2rem",
            marginBottom: "1rem",
          }}
        >
          <li>Browse songs alphabetically using Marathi characters</li>
          <li>Search for songs by title, lyrics, singer, or lyricist</li>
          <li>View complete lyrics and song meanings</li>
          <li>Find links to listen to songs on popular music platforms</li>
        </ul>

        <p>
          We do not host any music files. We only provide lyrics and information
          about songs to promote Marathi music and culture.
        </p>
      </div>

      <h2 className="section-title">How to Use</h2>

      <div
        style={{
          backgroundColor: "var(--color-accent)",
          padding: "2rem",
          borderRadius: "var(--border-radius)",
        }}
      >
        <ol
          style={{
            listStyleType: "decimal",
            paddingLeft: "2rem",
            marginBottom: "1rem",
          }}
        >
          <li>
            Click on a Marathi alphabet at the top to browse songs starting with
            that letter
          </li>
          <li>Use the search bar to find specific songs or artists</li>
          <li>Click on any song card to view its complete details</li>
          <li>
            On the song page, you can find links to listen to the song on
            various music platforms
          </li>
        </ol>
      </div>
    </div>
  );
}
